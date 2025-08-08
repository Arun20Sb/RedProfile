import os
import praw
import re
from dotenv import load_dotenv
from openai import OpenAI
from urllib.parse import urlparse

load_dotenv()

# Load environment variables
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
user_agent = os.getenv("USER_AGENT")
openrouter_api_key = os.getenv("OPENROUTER_API_KEY") 

# Setup OpenAI client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_api_key,
)

# Setup Reddit client
reddit = praw.Reddit(
    client_id=client_id,
    client_secret=client_secret,
    user_agent=user_agent,
)


# Preprocessing function
def clean_text(text):
    text = re.sub(r"http\S+", "", text)  # remove URLs
    text = re.sub(r"\s+", " ", text)  # collapse whitespace
    return text.strip()


# Main persona generation function
def generate_persona(username: str):
    try:
        user = reddit.redditor(username)
        posts = list(user.submissions.new(limit=100))
        comments = list(user.comments.new(limit=100))

        all_entries = []

        # Process posts
        for post in posts:
            content = post.title + "\n" + post.selftext
            if content.strip():
                cleaned = clean_text(content)
                all_entries.append(
                    {
                        "type": "post",
                        "text": cleaned,
                        "permalink": f"https://reddit.com{post.permalink}",
                    }
                )

        # Process comments
        for comment in comments:
            if comment.body:
                cleaned = clean_text(comment.body)
                all_entries.append(
                    {
                        "type": "comment",
                        "text": cleaned,
                        "permalink": f"https://reddit.com{comment.permalink}",
                    }
                )

        if not all_entries:
            return "No public posts or comments found."

        # Combine text for LLM
        combined_text = ""
        for i, entry in enumerate(all_entries):
            combined_text += f"[{entry['type'].upper()} #{i+1}]\n{entry['text']}\n(Source: {entry['permalink']})\n\n"

        # Final prompt
        prompt = f"""
You are an expert behavioral and UX researcher.
Analyze the Reddit user based on the comments/posts below and generate a **structured, clean, and realistic user persona** in the following EXACT format:

**BASIC INFO**
NAME: [First Name] [Last Name]
AGE: [Number only, e.g., 28]
OCCUPATION: [Job title]
STATUS: [Single/Married/In a relationship/Student]
LOCATION: [City, Country or Region]
TIER: [Early Adopters/Mainstream/Late Adopters]
ARCHETYPE: [The Explorer/The Achiever/The Critic/The Creator/The Helper/The Dreamer]

**PERSONALITY TRAITS**
List 4-5 traits (e.g., Practical, Creative, etc.)

**MOTIVATIONS**
Rate any 4 motivations from 1-5:
CONVENIENCE: [1-5]
WELLNESS: [1-5]
SPEED: [1-5]
PREFERENCES: [1-5]
COMFORT: [1-5]
DIETARY NEEDS: [1-5]

**PERSONALITY SCALES**
Provide numeric values (1-5) for 5 of the following:
INTROVERT: [1-5]
EXTROVERT: [1-5]
THINKING: [1-5]
FEELING: [1-5]
SENSING: [1-5]
INTUITION: [1-5]
JUDGING: [1-5]
PERCEIVING: [1-5]

**BEHAVIOUR & HABITS**
- At least 4, max 6 bullet points

**GOALS & NEEDS**
- At least 4 bullet points

**FRUSTRATIONS**
- At least 4, max 6 bullet points

**QUOTE**
"[Verbatim quote from their Reddit content]"

Here is the user's Reddit content:
{combined_text}
"""
        # Call LLM
        completion = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct:free",
            messages=[{"role": "user", "content": prompt}],
        )

        response = completion.choices[0].message.content

        # Output persona in .txt file
        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)
        filename = os.path.join(output_dir, f"{username}_persona.txt")

        with open(filename, "w", encoding="utf-8") as f:
            f.write(response)

        return response

    except Exception as e:
        return f"Error: {str(e)}"


import requests
import json
import os

# Fetch the GitHub token from environment variables
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME")  # Add this to Railway variables

if not GITHUB_TOKEN or not GITHUB_USERNAME:
    raise Exception("GITHUB_TOKEN and GITHUB_USERNAME must be set in environment variables.")

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}"
}

query = """
{
  user(login: "%s") {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}
""" % GITHUB_USERNAME

# Fetch contributions data
response = requests.post(
    "https://api.github.com/graphql",
    json={"query": query},
    headers=headers
)

if response.status_code != 200:
    raise Exception(f"GitHub API returned error: {response.status_code} {response.text}")

data = response.json()

# Extract contribution days
contributions = [
    week["contributionDays"] for week in data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
]

# Save to the public folder in your Railway project
output_path = os.path.join("public", "contributions.json")
with open(output_path, "w") as f:
    json.dump(contributions, f, indent=2)

print(f"Updated contributions.json at {output_path}")

import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
from datetime import datetime

# Configuration
FB_PAGE_URL = "https://www.facebook.com/theabekasdachurch/live_videos"
SESSION_ID = "your_session_id"  # Get from browser cookies
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"


def get_facebook_sermons():
    headers = {
        "User-Agent": USER_AGENT,
        # Replace with your cookies
        "Cookie": f"c_user=100000000000000; xs={SESSION_ID};"
    }

    try:
        print("Fetching Facebook page...")
        response = requests.get(FB_PAGE_URL, headers=headers)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        sermons = []

        # Facebook's video post container (may need adjustment)
        video_containers = soup.select('div[role="article"]')

        print(f"Found {len(video_containers)} potential video posts")

        for container in video_containers:
            try:
                # Extract basic information
                title = container.select_one(
                    'div[dir="auto"] span').text.strip()
                date_element = container.select_one('abbr')
                timestamp = date_element['data-tooltip-content'] if date_element else ""

                # Convert Facebook date to YYYY-MM-DD
                post_date = datetime.strptime(timestamp, '%A, %B %d, %Y at %I:%M %p').strftime(
                    '%Y-%m-%d') if timestamp else ""

                # Extract video URL
                video_link = container.select_one('a[href*="/videos/"]')
                video_url = f"https://facebook.com{video_link['href']}" if video_link else ""

                # Extract thumbnail URL
                thumbnail = container.select_one('img')
                thumbnail_url = thumbnail['src'] if thumbnail else ""

                sermons.append({
                    "id": video_url.split('/')[-1] if video_url else "",
                    "title": title,
                    "preacher": "Default Preacher",  # You'll need to customize this
                    "date": post_date,
                    "description": title,  # Facebook often uses title as description
                    "mediaUrl": video_url,
                    "mediaType": "video",
                    "posterUrl": thumbnail_url
                })

            except Exception as e:
                print(f"Error processing a post: {str(e)}")
                continue

        print(f"Successfully extracted {len(sermons)} sermons")
        return sermons

    except Exception as e:
        print(f"Failed to fetch Facebook page: {str(e)}")
        return []


def save_to_json(sermons, filename="sermons.json"):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(sermons, f, ensure_ascii=False, indent=2)
    print(f"Saved sermons to {filename}")


def save_to_csv(sermons, filename="sermons.csv"):
    df = pd.DataFrame(sermons)
    df.to_csv(filename, index=False)
    print(f"Saved sermons to {filename}")


if __name__ == "__main__":
    sermons = get_facebook_sermons()

    if sermons:
        save_to_json(sermons)
        save_to_csv(sermons)  # Optional CSV backup
    else:
        print("No sermons were extracted. Check your configuration.")

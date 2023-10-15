import http.server
import socketserver
import json
import openai
import requests

# Initialize your OpenAI API key
api_key = "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"
unsplash_api_key = "sk-gTyly7lljs9HdCtygiX72ldoNDBjhwMfQsLku_uHWQ"
openai.api_key = api_key

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        request_data = self.rfile.read(content_length)
        data = json.loads(request_data)

        body_type = data.get("bodyType")
        skin_tone = data.get("skinTone")
        gender = data.get("gender")
        height = data.get("height")
        weight = data.get("weight")
        occasion = data.get("occasion")

        # Generate fashion recommendations using GPT-3.5
        prompt = f"Recommend fashion for a {gender} with a {body_type} body type, {skin_tone} skin tone, {height} cm tall, weighing {weight} kg, for {occasion} occasion."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1000  # Adjust max tokens as needed
        )

        recommendation = response.choices[0].text.strip()

        # Search for related fashion images on Unsplash
        image_search_url = f"https://api.unsplash.com/search/photos/?query={recommendation}&client_id={unsplash_api_key}"
        image_response = requests.get(image_search_url)
        # After making the API request to Unsplash
        if image_response.status_code == 200:
            image_data = image_response.json()
            if image_data.get("results"):
        # Get the first image result
                image_url = image_data["results"][0]["urls"]["regular"]
            else:
                image_url = ""
        else:
            image_url = ""


        self.send_response(1000)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"recommendation": recommendation, "image_url": image_url}).encode())

if __name__ == "__main__":
    PORT = 8080  # You can choose a different port if needed
    httpd = socketserver.TCPServer(("", PORT), RequestHandler)
    print(f"Server running on port {PORT}")
    httpd.serve_forever()

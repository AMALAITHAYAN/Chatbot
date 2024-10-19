from flask import Flask, request, jsonify
from google.cloud import dialogflow_v2 as dialogflow
import os

app = Flask(__name__)

# Set the path to your service account key
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/amalaithayan/Desktop/healthcare/service_account_file.json"
project_id = 'healthbotintegration'  # Replace with your Dialogflow project ID

@app.route('/api/message', methods=['POST'])
def handle_message():
    user_query = request.json.get('query')
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, '123456')

    text_input = dialogflow.TextInput(text=user_query, language_code='en')
    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(session=session, query_input=query_input)
    return jsonify({'fulfillmentText': response.query_result.fulfillment_text})

if __name__ == '__main__':
    app.run(debug=True)

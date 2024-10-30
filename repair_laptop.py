from flask import Flask, request, jsonify, render_template
import groq

app = Flask(__name__)

client = groq.Client(
    api_key="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"  # 직접 API 키를 입력
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    user_input = data.get("message", "")
    
    if not user_input:
        return jsonify({"error": "No message sent"}), 400

    try:
        app.logger.info(f"Sending message to Groq AI: {user_input}")
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {
                    "role": "user",
                    "content": user_input,
                },
                {
                    "role": "system",
                    "content": """you write like this foramt:
                     1. Problem Summary
                    (Briefly summarize what the problem is)

                    2. Causes of the Problem
                    (List the causes of the problem numbered)

                    3. Solutions + Reference Materials
                    Provide solutions for each cause based on the numbering + Include reference materials for anything that might be unclear

                    Example:

                    1. Problem Summary
                    The laptop does not boot up.

                    2. Causes of the Problem

                    Recently added hardware like SSD and RAM
                    It was working fine, but suddenly stopped
                    An error occurred during the operating system update
                    Solutions for Cause 1

                    Disassemble the laptop. + Instructions for disassembling based on the laptop model
                    Remove the added components. + What to remove based on the model
                    Reassemble and try turning it on again.
                    Solutions for Cause 2

                    Disassemble the laptop. + Instructions for disassembling based on the laptop model
                    Remove the added components. + What to remove based on the model
                    Reassemble and try turning it on again.
                    Solutions for Cause 3

                    Access the BIOS. + Instructions for accessing the BIOS
                    Reset the BIOS. + What settings need to be adjusted in the BIOS
                    After finishing the settings, try turning it on again."""
                }
            ],
            stop="```",
        )
        response_message = completion.choices[0].message.content
        print("AI response:", response_message)
    except Exception as e:
        print(f"오류 코드: {str(e)}")
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response_message})

if __name__ == '__main__':
    app.run(debug=True)


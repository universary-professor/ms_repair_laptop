function reference_press() {
    const model = document.querySelector('.model');
    const mainContainer = document.querySelector('.main-container');
    
    if (model.style.display === "none" || model.style.display === "") {
        model.style.display = "flex";
        mainContainer.classList.add('disabled');
    } else {
        model.style.display = "none";
        mainContainer.classList.remove('disabled');
    }
}
function send_press() {
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.querySelector('.messages-container');

    if (userInput.value.trim()) {
        // 사용자 입력 메시지 표시
        const messageBox = document.createElement('div');
        messageBox.className = 'message-box sent'; // 보낸 메시지 스타일 적용
        messageBox.innerText = userInput.value;
        messagesContainer.appendChild(messageBox);
        
        // 서버로 메시지 전송 (AJAX)
        $.ajax({
            url: '/send_message',  // Flask 서버의 경로
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput.value }),
            success: function(response) {
                // 서버 응답 메시지 표시
                const responseBox = document.createElement('div');
                responseBox.className = 'message-box received'; // 받은 메시지 스타일 적용
                responseBox.innerText = response.response; // 서버로부터 받은 응답 메시지
                messagesContainer.appendChild(responseBox);
                messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
            },
            error: function(error) {
                const errorBox = document.createElement('div');
                errorBox.className = 'message-box error'; // 오류 메시지 스타일
                errorBox.innerText = 'Error: ' + (error.responseJSON ? error.responseJSON.error : 'Unknown error'); // 오류 메시지 표시
                messagesContainer.appendChild(errorBox);
                messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
            }
        });

        // 입력 필드 비우기
        userInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
    }
}

const Chat = (function() {
    return {
        init: function() {
            const sendButton = document.getElementById('send-button');
            const userInput = document.getElementById('user-input');

            sendButton.addEventListener('click', send_press);
            userInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // 기본 동작 방지
                    send_press(); // 메시지 전송 함수 호출
                }
            });
        }
    };
})();

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    Chat.init();  
});

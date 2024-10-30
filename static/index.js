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


// function send_press() {
//     const userInput = document.getElementById('user-input');
//     const messagesContainer = document.querySelector('.messages-container');

//     if (userInput.value.trim()) {
//         // 사용자 입력 메시지 표시
//         const messageBox = document.createElement('div');
//         messageBox.className = 'message-box sent'; // 보낸 메시지 스타일 적용
//         messageBox.innerText = userInput.value;
//         messagesContainer.appendChild(messageBox);
        
//         // 서버로 메시지 전송 (AJAX)
//         $.ajax({
//             url: '/send_message',  // Flask 서버의 경로
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify({ message: userInput.value }),
//             success: function(response) {
//                 // 서버 응답 메시지 표시
//                 const responseBox = document.createElement('div');
//                 responseBox.className = 'message-box received'; // 받은 메시지 스타일 적용
//                 responseBox.innerText = response.response; // 서버로부터 받은 응답 메시지
//                 messagesContainer.appendChild(responseBox);
//                 messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
//             },
//             error: function(error) {
//                 const errorBox = document.createElement('div');
//                 errorBox.className = 'message-box error'; // 오류 메시지 스타일
//                 errorBox.innerText = 'Error: ' + error.responseJSON.error; // 오류 메시지 표시
//                 messagesContainer.appendChild(errorBox);
//                 messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
//             }
//         });

//         // 입력 필드 비우기
//         userInput.value = '';
//         messagesContainer.scrollTop = messagesContainer.scrollHeight; // 스크롤을 가장 아래로 이동
//     }
// }

// // Chat 모듈
// const Chat = (function() {
//     const myName = "user name";  // 사용자 이름을 설정

//     function appendMessageTag(LR_className, senderName, message) {
//         const messagesContainer = document.querySelector('.messages-container');
//         const messageDiv = document.createElement('div');

//         messageDiv.classList.add('message-box', LR_className);  // 스타일링을 위한 클래스 추가
//         messageDiv.textContent = `${senderName}: ${message}`;  // 메시지 텍스트 포맷
//         messagesContainer.appendChild(messageDiv);  // 메시지를 컨테이너에 추가
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;  // 스크롤을 아래로 이동
//     }

//     function sendMessage() {
//         const userInput = document.getElementById('user-input');
//         const message = userInput.value.trim();
//         if (message) {
//             appendMessageTag('sent', myName, message); // 자신의 메시지 추가
//             userInput.value = ''; // 입력 필드 비우기
//         }
//     }

//     return {
//         init: function() {
//             const sendButton = document.getElementById('send-button');
//             const userInput = document.getElementById('user-input');

//             sendButton.addEventListener('click', send_press);
//             userInput.addEventListener('keydown', function(e) {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault(); // 기본 동작 방지
//                     send_press(); // 메시지 전송 함수 호출
//                 }
//             });
//         },
//         sendMessage: sendMessage // 외부에서 호출할 수 있도록 sendMessage 함수 공개
//     };
// })();

// // 초기화
// document.addEventListener('DOMContentLoaded', function() {
//     Chat.init();  
// });

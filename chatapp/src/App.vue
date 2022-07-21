<template>
<div class="view login" v-if="state.username === '' || state.username === null">
  <form action="login-form" @submit.prevent="Login">
    <div class="form-inner">
      <h1>Login to BilgeChat</h1>
    <label for="username">Username</label>
    <input 
    type="text" 
    v-model="inputUsername" 
    placeholder="lütfen kullanıcı adınızı girin..." />
    <input
     type="submit" 
     value="Login"/>

    </div>
  </form>
</div>
<div class="view chat" v-else>
  <header>
    <button class="logout" @click="Logout">Logout</button>
    <h1>hoşgeldiniz, {{state.username}}</h1>

   </header>
  <section class="chat-box">
    <div 
      v-for="message in state.messages" 
      :key="message.key" 
      :class="(message.username == state.username ? 'message current-user' :'message')">
       <div class="message-inner">
        <div class="username">{{message.username}}</div>
        <div class="content">{{message.content}}</div>

      </div>
    </div>
  </section>
  <footer>
    <form @submit.prevent="SendMessage">
      <input 
      type="text" 
      v-model="inputMessage" 
      placeholder="mesajınızı yazın..."/>
      <input 
      type="submit" 
      value="Send"/>
      
    </form>
  </footer>
</div>
</template>

<script>

import {reactive, onMounted, ref} from 'vue';
import db from './db';



export default {
  setup () {
    const inputUsername = ref("");
    const inputMessage = ref("");
    const state = reactive({
      username:"",
      messages: []
    });

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    }

    const Logout = () => {
      state.username = "";
    }

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");

      if(inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value
      }

      messagesRef.push(message);
      inputMessage.value = "";

    }
    onMounted (() => {
      const messagesRef = db.database().ref("messages");

      messagesRef.on('value', onSnapshot => {
        const data =onSnapshot.val();
        let messages =[];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });

        });

        state.messages=messages;



      });

    });


    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout
    }



  }
  
 
}
</script>

<style lang="scss">
* {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #810f81e5;
	
	&.login {

		align-items: center;

		.login-form {
			display: block;
			width: 100%;
			padding: 15px;
			
			.form-inner {
				display: block;
				background-color: rgb(81, 9, 139);
				padding: 50px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
				h1 {
					color: rgb(28, 218, 170);
					font-size: 28px;
					margin-bottom: 30px;
				}
				label {
					display: block;
					margin-bottom: 5px;
					color: rgb(5, 195, 253);
					font-size: 16px;
					transition: 0.4s;
				}
				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
					color: rgb(229, 204, 233);
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #4ee0f3;
					transition: 0.4s;
					&::placeholder {
						color: rgb(158, 4, 172);
						transition: 0.4s;
					}
				}
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					background-color: #330546;
					border-radius: 8px;
					color: rgb(120, 15, 206);
					font-size: 18px;
					font-weight: 700;
				}

				&:focus-within {
					label {
						color: #730c88;
					}

					input[type="text"] {
						background-color: rgb(74, 29, 133);
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
						&::placeholder {
							color: rgb(214, 138, 230);
						}
					}
				}
			}
		}
	}
	&.chat {
		flex-direction: column;

		header {
			position: relative;
			display: block;
			width: 100%;
			padding: 50px 30px 10px;

			.logout {
				position: absolute;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: rgb(70, 3, 3);
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}

			h1 {
				color: rgb(70, 3, 3);
			}

		}
		.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: rgb(177, 140, 140);
			box-shadow: 0px 0px 12px rgba(242, 75, 248, 0.932);
			flex: 1 1 100%;
			padding: 30px;

			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: rgb(62, 5, 100);
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}
					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #7e0bac;
						border-radius: 999px;
						color:  rgb(19, 9, 19);
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}

				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;
					.message-inner {
						max-width: 75%;
						.content {
							color: rgb(19, 9, 19);
							font-weight: 600;
							background-color: #7e0bac;
						}
					}
				}
			}
		}
		footer {
			position: sticky;
			bottom: 0px;
			background-color: rgb(77, 7, 87);
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(60, 216, 130, 0.2);

			form {
				display: flex;

				input[type="text"] {
					flex: 1 1 100%;

					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #aa6be6;
					transition: 0.4s;

					&::placeholder {
						color: rgb(116, 18, 107);
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;
					background-color: #ea526f;
					color: rgb(116, 18, 107);
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}
}

</style>

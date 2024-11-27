<template>
  <div class="container" :class="{ 'right-panel-active': !loginState }">
    <!-- Sign Up -->
    <div class="container__form container--signup">
      <form action="#" class="form" id="form1">
        <h2 class="form__title">Sign Up</h2>
        <input
          type="text"
          placeholder="User Name"
          class="input"
          v-model="userSignUpInfo.name"
        />
        <input
          type="email"
          placeholder="Email"
          class="input"
          v-model="userSignUpInfo.email"
        />
        <input
          type="password"
          placeholder="Password"
          class="input"
          v-model="userSignUpInfo.password"
        />
        <button class="btn" @click="signUpClick">Sign Up</button>
      </form>
    </div>

    <!-- Sign In -->
    <div class="container__form container--signin">
      <form action="#" class="form" id="form2">
        <h2 class="form__title">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          class="input"
          v-model="userSignInInfo.email"
        />
        <input
          type="password"
          placeholder="Password"
          class="input"
          v-model="userSignInInfo.password"
        />
        <a href="#" class="link">Forgot your password?</a>
        <button class="btn" @click="signInClick">Sign In</button>
      </form>
    </div>

    <!-- Overlay -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--left">
          <button class="btn" id="signIn" @click="change2SignIn">
            Sign In
          </button>
        </div>
        <div class="overlay__panel overlay--right">
          <button class="btn" id="signUp" @click="change2SignUp">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";

onMounted(() => {
  const signInBtn = document.getElementById("signIn");
  const signUpBtn = document.getElementById("signUp");
  const fistForm = document.getElementById("form1");
  const secondForm = document.getElementById("form2");
  const container = document.querySelector(".container");

  fistForm.addEventListener("submit", (e) => e.preventDefault());
  secondForm.addEventListener("submit", (e) => e.preventDefault());
});

const loginState = ref(false);
const userSignUpInfo = ref({
  name: "",
  email: "",
  password: "",
});
const userSignInInfo = ref({
  email: "",
  password: "",
});

const change2SignIn = () => {
  loginState.value = true
  userSignInInfo.value.email = userSignUpInfo.value.email
  userSignInInfo.value.password = userSignUpInfo.value.password
}

const change2SignUp = () => {
  loginState.value = false
  userSignUpInfo.value.email = userSignInInfo.value.email
  userSignUpInfo.value.password = userSignInInfo.value.password
}

const signInClick = () => {
  console.log("登录submit");
  console.log(userSignInInfo.value);
};

const signUpClick = () => {
  console.log("注册submit");
  console.log(userSignUpInfo.value);
};

// http.post('/admin/login',{
//         adminName: user.username,
//         adminPassword: user.password
//        }).then((response)=>{
//         if(response.data.code==200){
//             //-:修改全局的登录状态
//             store.isLogin = true
//             store.userInfo.userName = response.data.data.adminName
//             //-:登录成功之后，跳转到首页面
//             router.push('/home')
//         }else{
//             ElMessage.success(response.data.message)
//         }
//        })
</script>

<style lang="scss" scoped>
$white: #e9e9e9;
$gray: #333;
$blue: #0367a6;
$lightblue: #008997;
$button-radius: 0.7rem;
$max-width: 100vw;
$max-height: 100vh;

body {
  align-items: center;
  background-color: $white;
  // background: url("/bg-1.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  color: $gray;
  font-weight: 800;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: $gray;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: $white;
  border-radius: $button-radius;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: $max-height;
  width: $max-width;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: $lightblue;
  background: url("/32073.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: $blue;
  background-size: 200%;
  background-image: linear-gradient(
    90deg,
    rgb(54, 15, 93) 0%,
    rgb(32, 41, 139) 36%,
    rgb(32, 41, 139) 63%,
    rgb(54, 15, 93) 100%
  );
  border-radius: $button-radius;
  border: 1px solid $blue;
  color: $white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 3.6rem;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  box-shadow: 0.4rem 1.2rem 1.7rem rgba(0, 0, 0, 0.25),
    0.3rem 0.9rem 0.7rem rgba(0, 0, 0, 0.22);
  &:hover {
    background-position-x: 126%;
    transition: all 0.4s ease-in-out;
    box-shadow: 0.4rem 1.2rem 1.7rem rgba(0, 0, 0, 0.45),
      0 0.9rem 0.7rem rgba(0, 0, 0, 0.42);
  }
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>

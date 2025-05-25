<template>
    <div class="sidebar" >
      <div class="top">
          <img class="menu" src="../assets/menu.png" @click="handleExtend('250px')">
          <div class="chat" @click="chat">
            <img src="../assets/plus.png">
            <p v-show="isExtend">New Chat</p>
          </div>
          
          <div class="latest" v-show="isExtend">
            <p class="latest-title">
                Latest
            </p>
            <div class="latest-entry" v-if="isExtend">
                <div v-for="(recent, index) in archievePrompt" :key="index" class="recent-style">
                    <a :href='`#${index}`'><img src="../assets/chat.png" :title="`${recent}`">{{ recent.substring(0, 15)+'...' }}</a>
                </div>
            </div>
          </div>
      </div>
      <div class="bottom">
        <div class="bottom-content">
          <img src="../assets/settings.png" alt="setting" srcset="">
          <p v-show="isExtend">Setting</p>
        </div>
        <div class="bottom-content">
          <img src="../assets/hchat.png" alt="history_icon" srcset="">
          <p v-show="isExtend">History</p>
        </div>
        <div class="bottom-content">
          <img src="../assets/help.png" alt="question_icon" srcset="">
          <p v-show="isExtend">Need Help?</p>
        </div>
      </div> 
    </div>
</template>

<script>
export default {
  name: 'sideBar',
  props: {
    archievePrompt: {
      type: Array,
      required: false,
    },
  },
  
  data(){
    return{
      isExtend: true,
      sideBarWidth: '',
      maxLength: 10
    }
  },
  methods:{
    handleExtend(newWidth){
      this.isExtend =! this.isExtend
      this.sideBarWidth = newWidth
    },
    chat(){
      location.reload();
    }
  },

  setup(){
    
  }
}
</script>

<style scoped>
.sidebar{
  display: inline-flex;
  padding: 20px 10px;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EDEDEB;
  animation: fadeIn 1.5;
}

.sidebar img{
  width: 25px;
}

.sidebar .menu{
  cursor: pointer;
  display: block;
  margin-left: 20px;
}

.sidebar .chat{
  gap: 15px;
  color: cornsilk;
  font-size: 15px;
  margin-top: 10px;
  margin-left: 5px;
  padding: 10px 15px;
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  background: -webkit-linear-gradient(12deg, #915DDE, #1c8ce8);

}

.sidebar .latest{
  display: flex;
  flex-direction: column;
  animation: fadeIn 1.5;
}

@keyframes fadeIn {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

.sidebar .latest-title{
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 17px;
}

.sidebar .latest-entry{
  gap: 10px;
  padding: 10px;
  padding-right: 25px;
  border-radius: 50px;
  color: #343434;
  cursor: pointer;
}

.bottom-content{
  display: flex;
  gap: 10px;
  padding: 10px;
  padding-right: 25px;
  border-radius: 50px;
  color: #343434;
  cursor: pointer;
}

.bottom-content:hover{
  background-color: #DEDEDC;
  border-radius: 30px;
}

.sidebar .latest-entry img{
  margin-left: 3px;
  margin-right: 5px;
  margin-bottom: -10px;
}

.sidebar .latest-entry div:hover{
  background-color: #DEDEDC;
  color: #915DDE;
  border-radius: 30px;
}

.sidebar .bottom{
  display: flex;
  flex-direction: column;
}

.recent-style{
  list-style-type: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}

.recent-style a{
  color: #080808;
}

.chat{
  cursor: pointer;
}

@media (max-width: 600px){
  .sidebar{
    display: none;
  }
}
</style>
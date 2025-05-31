<template>
<sideBar :archievePrompt="archievePrompt"/>
  <div class="display">
    <div class="nav">
        <p>AskVue</p>
        <img src="../assets/profile.png" alt="">
    </div>
    <div class="container">
        <div v-show="isDisplay">
            <div class="greet">
                <p><span>Hello Everyone!</span></p>
                <p>How may I help you?</p>
            </div>
            <div class="wrappers">
                <div class="info">
                    <p>(AI) is a broad field encompassing the theory and development of computer systems.</p>
                    <img src="../assets/ai.png" alt="" srcset="">
                </div>
                <div class="info">
                    <p>Okay guys, I'm ready to chat!  What's on your mind?  Let's talk. Don't be shy :)</p>
                    <img src="../assets/massage.png" alt="" srcset="">
                </div>
                <div class="info">
                    <p>AI segment" is a broad term that needs more context to be meaningful. Let's find it.</p>
                    <img src="../assets/web.png" alt="" srcset="">
                </div>
                <div class="info">
                    <p>Once I have more information, I can provide more specific and helpful information.</p>
                    <img src="../assets/interface.png" alt="" srcset="">
                </div>
            </div> 
        </div>

        <div v-show="loading" class="searching"><img src="../assets/searching.gif" width="120px" ></div>
        <div v-show="isProcess" v-if="response" class="mt-4 bg-gray-100 p-4 rounded whitespace-pre-wrap">
            <div class="display-answer">
                    <div v-for="(item, index) in arrResults" :key="index" class="result"
                    :id="item.id"             
                    >
                    <div class="title">{{ item.title }}</div> 
                    <div class="context">{{ item.context }}</div>
                </div>
            </div>
        </div>
        
        <div class="display-bottom">
            <div class="search-prompt">
                <input type="text" placeholder="Ask something.." v-model="prompt" autofocus>
                <div class="btnSend">
                    <!-- <img src="../assets/gallery.png" alt="" srcset="">
                    <img src="../assets/mic.png" alt="" srcset=""> -->
                    <img @click="askGemini" :disabled="loading" src="../assets/send.png" alt="send" v-show="prompt">
                </div>
            </div>
            <p class="footer">
                AskVue can make many mistakes. This is just for demo
            </p>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import sideBar from './sideBar.vue';
import { callGemini } from '../components/services/geminiService';

const prompt = ref('');
const currentPrompt = ref('')
const recentPrompt = ref('')
const response = ref('');
const answers = ref('')
const archievePrompt = ref([])
const error = ref('');
const typing = ref('')
// const results = ref([])
const arrResults = reactive([])
let counter = 0
// const itemRefs = {}

const loading = ref(false);
const isDisplay = ref(true)
const isProcess = ref(false)

const askGemini = async () => {
  response.value = '';
  answers.value = '';
  error.value = '';
  loading.value = true;
  isDisplay.value = false;
  isProcess.value = true;
  currentPrompt.value = prompt.value
  recentPrompt.value = currentPrompt.value
  prompt.value = ''
  typing.value = ''
  
  try {
    response.value = await callGemini(currentPrompt.value);
    answers.value = response.value.replace(/\*/g)

    let i = 0;
    const interval = setInterval(() => {
        if(i < answers.value.length) {
            typing.value += answers.value.charAt(i);
            i++;            
        }else {
            clearInterval(interval);
        }
           
    }, 2); // typing speed in ms


    if(currentPrompt.value.trim() !== ''){
            archievePrompt.value.push(currentPrompt.value.trim())     
    }

    if(answers.value.trim() !== ''){
        const newTitle = recentPrompt.value
        arrResults.push({id: counter, title: newTitle, context: answers.value})   
        let newId = counter++
        console.log(arrResults)
        await nextTick()

        const el = document.getElementById(`${newId}`)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

  } catch (err) {
    error.value = err.message;

  } finally {
    loading.value = false;
  }

};

</script>

<style scoped>
.display-answer {
    white-space: pre-wrap;
    padding: 0px 5%;
    max-height: 65vh;
    overflow-y: scroll;
}

.result{
    /* margin-bottom: 50px; */
    padding: 10px;
}

.display{
    position: relative;
    min-height: 100vh;
    padding-bottom: 15vh;
    flex: 1;
}

.display .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 20px;
}

.display .nav p{
 font-weight: bold;
 color: #787878;
}

.display .nav img{
   width: 40px;
}

.container{
    max-width: 850px;
    margin: auto;
}

.wrappers .info img{
    width: 80px;
}

.display .greet{
    padding: 20px;
    margin: 20px 0px;
    font-size: 50px;
    color: #c7c7c7;
    font-weight: bold;
}

.display .greet span{
    background: -webkit-linear-gradient(15deg, #915DDE, #1c8ce8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
}

.display .wrappers{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    padding: 20px;
}

.display .info{
    position: relative;
    padding: 20px;
    height: 200px;
    cursor: pointer;
    background-color: #f5f0ff;
    border-radius: 15px;
}

.display .info img{
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 42px;
    padding: 6px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 1px 1px 2px gray;
}

.display .info:hover{
    background-color: #f5f5f5;
}

.display-bottom{
    position: absolute;
    bottom: 0;
    max-width: 850px;
    width: 100%;
    padding: 0 20px;
    margin: auto;
}

.search-prompt{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 15px 20px;
    background: #EDEDEB;
    border-radius: 50px;
}

.search-prompt img{
    width: 24px;
    cursor: pointer;
}

.search-prompt div{
    gap: 15px;
    display: flex;
    align-items: center;
}

.search-prompt input{
    flex: 1;
    outline: none;
    padding: 8px;
    font-size: 16px;
    border: none;
    background: transparent;
}

.searching{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
}

.title{
    background: #EDEDEB;
    padding: 5px;
    border-radius: 20px;
    border: 1px dashed #080808;
    width: fit-content;
    font-weight: bold;
}

.context{
    margin-top: 20px;
    line-height: 28px;
}

.footer{
    margin: 15px auto;
    font-size: 12px;
    text-align: center;
    font-weight: 500;
}

@media (max-width: 600px){
  .display-bottom input{
    width: 150px;
  }

  .display-bottom img{
    width: 20px;
  }

  .search-prompt{
    padding: 5px 10px;
  }

  .search-prompt div{
    gap: 5px;
  }
}
</style>
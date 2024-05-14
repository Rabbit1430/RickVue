<template>
  <div class="myfiltrs">
    <div class="myfiltrname"><label for="name">Название персонажа</label>
    <input type="text" v-model="namefilter"/>
    </div>
    <div class="myfiltrstatus">
      <label for="status">Статус</label>
      <select v-model="statusfilter">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
    </div>
    <button @click="sortandfilter">Применить</button>
  </div>
  <div class="card">
    <div v-if="filtermydata.length === 0">Нет карточек</div>
    <div class="cardls" v-else>
      <div class="cardicon" v-for="crd in filtermydata" :key="crd.id" >
        <img :src="crd.image" />
        <div class="mycard">
        <div >{{ crd.name }}</div>
      <div >{{ crd.status }} - {{ crd.species }}</div>
    </div>
  </div>
    </div>
  </div>
  <div class="pagination">
      <button @click="prevpage" :disabled="page === 1">Назад</button>
      <div class="pagenumbers">
        <span v-for="mypage in allpage" :key="mypage" @click="gopage (mypage)" :class="{ active: page === mypage }">{{ mypage }}</span>
      </div>
      <button @click="nextpage" :disabled="page === allpage">Следующая</button>
    </div>

</template>

<script>
import myfunc from  './components/myfunc.js';

export default {
  setup() {
    const {
      apimydata, filters, sorting, mydata, filtermydata, namefilter, statusfilter, sortandfilter, setsorting, page, allpage, nextpage, prevpage, gopage
      
    } = myfunc();

    

    return {
      apimydata, filters, sorting, mydata, filtermydata, namefilter, statusfilter, sortandfilter, setsorting, page, allpage, nextpage, prevpage, gopage
      
    
    };
  },

}
</script>

<style scoped>
.myfiltrs {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 8%;
  align-items: center;
  gap: 20px;
  margin-top: 3%;
} 

.card {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: 3%;
}
.cardls {
  display: flex;
 justify-content: center;
 align-items: center;
 flex-wrap: wrap;
 width: 100%;
 gap: 40px;

 
}

img {
  width: 150px;
  border-radius: 10px;
}

.cardicon {
  display: flex;
  width: 600px;
  align-items: center;
  justify-content: space-between;
  background-color: #b4b4b4;
  border-radius: 10px;
  

  
}

.mycard{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 3%;

  text-align: right;
  
}



.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.pagenumbers {
  display: flex;
}

.pagenumbers span {
  margin: 0 5px;
  cursor: pointer;
}

.pagenumbers .active {
  font-weight: bold;
}
</style>

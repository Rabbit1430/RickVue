import {ref, onMounted} from 'vue'

export default function myfunc() {
  const mydata = ref([]);
  const filtermydata = ref([]);
  const namefilter = ref('')
  const statusfilter = ref('');
  const sortone = ref('');
  const sorttwo = ref('asc');
  const page = ref(1);
  const allpage = ref(1);



  const apimydata = async (page) => {
try{
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const mytotal = await fetch ('https://rickandmortyapi.com/api/character')
        const datatotal = await mytotal.json();
        allpage.value = datatotal.info.pages
        const data = await response.json();
        mydata.value = data.results;
      sortandfilter(page)
      } catch (error) {
        console.error('Ошибка', error);
      }
};


  const filters = () => {
    filtermydata.value = mydata.value.filter(item => {
      const namedata = item.name.toLowerCase().includes(namefilter.value.toLowerCase());
      const statusdata = !statusfilter.value || item.status.toLowerCase() === statusfilter.value.toLowerCase()
    return namedata && statusdata
    })
  };

  const sorting =() => {
    if(sortone.value) {
      filtermydata.value.sort((a,b) => {
        const sorta =a[sortone.value].toLowerCase();
        const sortb = b[sortone.value].toLowerCase();
        const sorting = 0;
        if(sorta > sortb) {
          sorting = 1;
        }else if(sorta  < sortb){
          sorting = -1
        }
        return sorttwo.value ==='asc' ? sorting : -sorting
      })
    }
  };

  const setsorting = (item) => {
    if(sortone.value === item){
      sortone.value = sortone.value === 'asc' ? 'desc' : 'asc';

    }else {
      sortone.value = item ;
      sorttwo.value = 'asc';
    }
sortandfilter(page.value)
  };

  const sortandfilter = (str) => {
    if(page.value){
      filters(str);
      sorting();
    }
  };

const nextpage = () => {
  if(page.value< allpage.value){
    page.value++;
    apimydata(page.value)
  }
};

const prevpage = () => {
  if(page.value > 1) {
    page.value--;
    apimydata(page.value)
  }
};

const gopage = (str)=> {
page.value = str
apimydata(str)
};

onMounted(() => {
  apimydata(page.value)
})

return{apimydata, filters, sorting, mydata, filtermydata, namefilter, statusfilter, sortandfilter, setsorting, page, allpage, nextpage, prevpage, gopage }
   
}

import types from './../types/home';
export default  {
    //获取首页列表数据
   [types.getTopicList]({commit},para){
       const { page = 0, category , type } = para;
       return ajax.get('/topics',{
           limit:30,
           tab:category,
           page:1
       }).then(data=>{
           commit(types.getTopicList,{
               list:data.data,
               page:page,
               category:category,
               type:type
           })
       })
   },
   //储存页面的滚动位置
   [types.savePageScrollY]({commit}, para ){
       const { scrollY ,category } = para;
       commit(types.savePageScrollY,{
           scrollY,category
       });
   }
}
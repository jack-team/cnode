import types from './../types/home';
export default  {
    //获取首页列表数据
   [types.getTopicList]({commit},para){
       const { page = 0, category , type } = para;
       const limit = 30;
       return ajax.get('/topics',{
           limit,
           tab:category,
           page:page
       }).then(data => {
           const count = data.data.length;
           commit(types.getTopicList,{
               list:data.data,
               page:page,
               category:category,
               type:type,
               isLastPage:count < limit
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
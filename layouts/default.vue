<template>
    <div>
        <Header></Header>
        <nuxt />
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
   components:{
       Header,
       Footer
   }
}
</script>
<style lang='less'>
*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}
em,i{
  font-style: normal;
}
img{
 width: 100%;
}
</style>

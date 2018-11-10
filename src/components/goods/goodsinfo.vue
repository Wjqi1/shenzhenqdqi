<template>

    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goods.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for='item in goods.imglist' :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>

                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number :min="1" :max="goods.goodsinfo.stock_quantity" size="mini" v-model="buyCount"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="shopcartoffset" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                                <Affix>
                                    <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
        
                                        <ul>
                                            <li>
                                                <a @click="isshowcomment=false" :class="isshowcomment?'':'selected'" href="javascript:;">商品介绍</a>
                                            </li>
                                            <li>
                                                <a @click="isshowcomment=true" :class="isshowcomment?'selected':''" href="javascript:;">商品评论</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isshowcomment" class="tab-content entry" style="display: block;">
                               <div style="padding-left:15px;" v-html="goods.goodsinfo.content"></div>
                        
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isshowcomment" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textarea" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="postComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="comments.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFMT('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[5, 10, 20, 30]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goods.hotgoodslist' :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFMT}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        >
            <div v-show="isshow" ref="animateDivRef" class="animateDiv" v-if="goods.imglist">
              <img :src="goods.imglist[0].original_path" alt="">
            </div>
        </transition>

    </div>

</template>
<style scoped>
       @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
       .animateDiv{
           width:50px;
           height:50px;
           position:absolute;
           left:0;
           top:0;
       }
       .animateDiv img{
           width:50px;
           height:50px;
       }
</style>
<script>
    // import axios from 'axios'//已经通过原型设置属性
      // 导入jquery放大镜插件的js
    import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js';
    import { Affix } from 'iview'

    export default {
       components:{
          Affix
       },

        data() {
            return {
                goods: {},//商品详情
                buyCount: 1,//购买数量
                isshowcomment:false,//评论显示
                comments:[],//评论数据
                pageIndex:1,//页码
                pageSize:2,//总页数
                total:0,//总条数
                addtoshopcartoffset:null,//加购物车按钮的位置
                shopcartoffset:null,//顶部购物车的位置
                isshow:false//是否显示飞入购物车图片
            }
        },
        created() {
            this.getGoodData()
            // console.log(this)
             this.getCommentData()
        },
        watch: {
            $route() {
                this.getGoodData()
                // console.log(this)
                this.getCommentData()
            }
        },
        updated() {
            // 初始化插件.放在这里是因为，我们点击了右边的连接之后，要重新图册
            $('#magnifier1').imgzoon({magnifier:'#magnifier1'})

        },
        methods: {
            getGoodData() {
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
                this.$axios.get(url).then(response => {
                    // console.log(response.data.message)
                    this.goods = response.data.message
                    // console.log($(this.$refs.shopcartoffset))
                    setTimeout(()=>{
                        this.addtoshopcartoffset=$(this.$refs.shopcartoffset).offset()
                        $(this.$refs.animateDivRef).css({
                            top:this.addtoshopcartoffset.top,
                            left:this.addtoshopcartoffset.left
                        })
                    this.shopcartoffset=$("#shoppingCartCount").offset()
                    },200)
                })
            },
            getCommentData() {
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                this.$axios.get(url).then(response => {
                this.comments = response.data.message
                this.total = response.data.totalcount

            })
          },
          handleSizeChange(pageSize){
              this.pageIndex=1
              this.pageSize=pageSize
              this.getCommentData()
          },
          handleCurrentChange(pageIndex){
            this.pageIndex=pageIndex
            this.getCommentData()
          },
        postComment(){
            const content=this.$refs.textarea.value
            if(content.trim().length===0){
                this.$message({
                  message:'评论内容不能为空哦...',
                  type:'warning'
                })
                 return
            }
           const url=`site/validate/comment/post/goods/${this.$route.params.goodsId}`
           this.$axios.post(url,{commenttxt:content}).then(response=>{
                this.$message({
                    message: '评论成功',
                    type: 'success' 
                })
                this.$refs.textarea.value=''
               this.pageIndex=1
                this.getCommentData()
            })
        },
        addToShopCart(){
            this.isshow=true
            const goods={
                goodsId:this.$route.params.goodsId,
                count:this.buyCount
            }
            this.$store.commit('addGoods',goods)
            // console.log(goods)
          
        },
        beforeEnter(el){
          el.style.top=this.addtoshopcartoffset.top+'px'
          el.style.left=this.addtoshopcartoffset.left+'px'
          el.style.transform='scale(1.0)'
        },
        enter(el,done){
          el.style.transition='all 0.2s'
          el.offsetHeight
          el.style.top=this.shopcartoffset.top-18+'px'
          el.style.left=this.shopcartoffset.left+'px'
          el.style.transform='scale(0.3)'

          setTimeout(()=>{
              done()
          },100)
        },
        afterEnter(){
            this.isshow=false 
        }



       }
    }

</script>

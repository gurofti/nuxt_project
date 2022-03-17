<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div class="layout">
    <LoadingBar/>
    <AlertMessage/>
    <Layout>
      <Sider width="240 " ref="sider" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">

        <!-- Logo -->
        <div class="private-logo-area">
          <div class="private-image-container">
            <img class="private-logo-image" src="@/static/logolayout.jpg">
          </div>
          <div class="private-logo-text">
            <span class="private-logo-header">Sualsizler</span>
            <span class="private-dev-text"><br>Dashboard</span>
          </div>
        </div>

        <!-- Menu -->
        <Menu :active-name="$route.path.toString()" theme="light" width="auto" :open-names="['1']">
          <MenuGroup
            v-for="(group, index) in menuList" :key="index"
            :title="group.groupTitle">

            <div v-for="menu in group.categoryList" :key="menu.name">

            <!-- Menu -->
            <MenuItem v-if="menu.type === 'menu'" class="font" :name="menu.to">
              <n-link :to="menu.to" :key="menu.to">
                <div>
                  <Icon :type="menu.icon" class="p-title-icon"></Icon>
                  <span class="p-menu-text" @click="headerTitleChange(menu.title)">
                    {{ menu.title }}
                  </span>
                </div>
              </n-link>
            </MenuItem>

            <!-- Sub Menu -->
            <Submenu v-else-if="menu.type === 'sub-menu'" :name="menu.to">
              <template slot="title">
                <Icon type="logo-buffer"/>
                <span class="p-menu-text">
                  {{ menu.title }}
                </span>
              </template>
              <MenuItem to="" v-for="subMenu in menu.list" :name="subMenu.to" :key="subMenu.name" class="private-left-menu">
                <span class="p-menu-text" @click="headerTitleChange(subMenu.title)">
                  <n-link :to="subMenu.to">
                    <Icon type="ios-pricetags" class="pr-0.5" />
                    {{ subMenu.title }}
                  </n-link>
                </span>
              </MenuItem>
            </Submenu>

            </div>
          </MenuGroup>

          <!-- Logout -->
          <MenuItem class="font" name="1-1">
            <span class="p-menu-text">
              <div @click="logout">
                Çıkış Yap
              </div>
            </span>
          </MenuItem>


        </Menu>

      </Sider>
      <div :class="privateLayout">
        <Layout>
          <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 12px 0 18px'}" type="md-menu"
                  size="24"></Icon>
            <span class="header-title">{{ $route.meta.title }}</span>
            <div class="layout-nav private-notification-area">

              <Menu mode="horizontal" theme="light" active-name="1">
                <Submenu name="3">
                  <template slot="title">
                    <Badge :count="1">
                      <Avatar shape="square" icon="ios-person"/>
                    </Badge>
                  </template>
                  <MenuGroup title="Genel">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                  </MenuGroup>
                  <MenuGroup title="Hesap">
                    <MenuItem name="3-4">
                      <div @click="logout">
                        Çıkış Yap
                      </div>
                    </MenuItem>
                  </MenuGroup>
                </Submenu>
              </Menu>


            </div>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
            <Nuxt />
          </Content>
        </Layout>
      </div>
    </Layout>

  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {EDUCATIONS} from "@/store/constants";
import LoadingBar from "@/components/layout/LoadingBar";
import AlertMessage from "@/components/layout/AlertMessage";

export default {
  middleware: 'auth-user',
  components: {
    LoadingBar,
    AlertMessage
  },
  head() {
    return {
      title: this.$route.meta.title + ' - Sualsizler'
    }
  },
  data() {
    return {
      isCollapsed: false,
      privateLayout: 'private-layout-full',
      headerTitle: '',
      menuList: [
        {
          groupTitle: 'Eğitim',
          categoryList: [
            {
              name: '/dashboard',
              title: 'Dashboard',
              type: 'menu',
              to: '/',
              icon: 'ios-keypad'
            },
            {
              name: '/header-training',
              title: 'Kategoriler',
              type: 'menu',
              to: '/training',
              icon: 'logo-buffer'
            },
            {
              name: '/header-education',
              title: 'Eğitimler',
              type: 'sub-menu',
              to: '/education',
              list: [
                {
                  name: '/education',
                  title: 'Tüm Eğitimler',
                  to: '/education',
                },
                {
                  name: '/education/create',
                  title: 'Eğitim Oluştur',
                  to: '/education/create',
                },
                {
                  name: '/education/comments',
                  title: 'Eğitim Yorumları',
                  to: '/education/comments',
                }
              ]
            },
            {
              name: '/header-video',
              title: 'Videolar',
              type: 'sub-menu',
              to: '/video',
              list: [
                {
                  name: '/video',
                  title: 'Tüm Videolar',
                  to: '/video',
                },
                {
                  name: '/video/create',
                  title: 'Video Oluştur',
                  to: '/video/create',
                },
                {
                  name: '/video/comments',
                  title: 'Video Yorumları',
                  to: '/video/comments',
                }
              ]
            },
            {
              name: '/header-question',
              title: 'Sorular',
              type: 'sub-menu',
              to: '/question',
              list: [
                {
                  name: '/question',
                  title: 'Tüm Sorular',
                  to: '/question',
                },
                {
                  name: '/question/create',
                  title: 'Soru Oluştur',
                  to: '/question/create',
                },
                {
                  name: '/question/comments',
                  title: 'Soru Yorumları',
                  to: '/question/comments',
                }
              ]
            }
          ]
        },
        {
          groupTitle: 'Yayıncı',
          categoryList: [
            {
              name: '/publisher/post',
              title: 'Paylaşımlar',
              type: 'sub-menu',
              to: '/publisher/post',
              list: [
                {
                  name: '/publisher/post',
                  title: 'Tüm Paylaşımlar',
                  to: '/publisher/post',
                },
                {
                  name: '/publisher/post/create',
                  title: 'Paylaşım Oluştur',
                  to: '/publisher/post/create',
                },
              ]
            },

            {
              name: '/publisher/post/comments',
              title: 'Yorumlar',
              type: 'menu',
              to: '/publisher/post/comments',
              icon: 'logo-buffer'
            },
            {
              name: '/publisher/my-followers',
              title: 'Takipçiler',
              type: 'menu',
              to: '/publisher/my-followers',
              icon: 'logo-buffer'
            },
          ]
        },

      ]
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    ...mapState({
      metaTitle: state => state.metaTitle
    }),
  },
  methods: {
    ...mapActions('educations', {
      educations: EDUCATIONS
    }),
    collapsedSider() {
      this.privateLayout = this.privateLayout === 'private-layout-full' ?
        'private-layout-mini' : 'private-layout-full'
      this.$refs.sider.toggleCollapse();
    },
    async logout() {
      await this.$auth.logout()
    },
    headerTitleChange(value) {
      this.headerTitle = value
    },
    refreshHeaderTitle() {
      this.headerTitle =  this.$route.meta.title
    }
  },
  created() {
    this.refreshHeaderTitle()
  }
}
</script>
<style>
.layout {
  border: 0;
  border-radius: 0;
}

.layout-header-bar {
  position: sticky;
  top: 0;
}

.private-layout-mini {
  width: calc(100% - 74px) !important;
  min-width: calc(100% - 74px) !important;
  max-width: calc(100% - 74px) !important;
}

.private-layout-full {
  width: calc(100% - 240px) !important;
  min-width: calc(100% - 240px) !important;
  max-width: calc(100% - 240px) !important;
}

.ivu-layout-sider {
  height: 100vh;
}

.private-logo-area {
  text-align: center;
}

.private-notification-area {
  display: inline-block;
  float: right;
}

.private-image-container img {
  margin: 10px auto;
  width: 82px;
}

.private-logo-header {
  font-weight: 600;
  font-size: 16px;
}

.private-logo-text {
  line-height: 1.1;
  font-size: 11px;
  margin-bottom: 24px;
}

.private-image-container {
  margin: 8px 0;
}

.p-title-icon {
  margin-right: 8px;
}

.ivu-layout-sider-children {
  position: fixed;
  width: 240px;
  background: white;
}


/*Mini Menu*/
.ivu-layout {
  z-index: 100;
}

.private-image-container .ivu-layout-sider-collapsed img {
  width: 12px !important;
}

.ivu-layout-sider-collapsed .private-logo-image {
  width: 50px !important;
}

.ivu-layout-sider-collapsed,
.ivu-layout-sider,
.ivu-layout-sider-collapsed .ivu-layout-sider-children,
.ivu-menu-item *,
.private-image-container img,
.private-logo-text,
.ivu-layout-sider-collapsed .p-menu-text,
.ivu-layout-sider-collapsed .private-logo-image {
  transition: all .4s;
}

.private-logo-text,
.private-image-container img,
.ivu-menu {
  transition-delay: .4s;
}

.p-menu-text a {
  width: 100%;
  display: inline-block;
}

.p-menu-text {
  transition: display 1s;
}

.ivu-layout-sider-collapsed .private-logo-header {
  font-size: 11px;
}

.ivu-layout-sider-collapsed .ivu-menu-submenu-title > i {
  margin-right: 0;
}

.ivu-layout-sider-collapsed .ivu-menu-item {
  padding: 24px 0;
  text-align: center;
}

.ivu-layout-sider-collapsed .p-title-icon {
  margin: 0;
}

.ivu-layout-sider-collapsed .private-logo-text {
  margin: 8px 0;
}

.ivu-layout-sider-collapsed .p-menu-text {
  display: none !important;
}

.ivu-layout-sider-collapsed .ivu-menu-submenu-title {
  padding: 7px 0;
  text-align: center;
}

.ivu-layout-sider-collapsed .ivu-menu-submenu-title .ivu-icon-ios-arrow-down:before {
  content: '';
}

.ivu-layout-sider-collapsed .ivu-layout-sider-children {
  position: fixed;
  width: 78px;
}
</style>

import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },{
                path: "/visgraph1",
                name: "visgraph1",
                meta: {
                    title: 'cfg图1'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Vis3.vue")
            },{
                path: "/visgraph2",
                name: "visgraph2",
                meta: {
                    title: 'cfg图2'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Vis4.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/dyComponent",
                name: "dyComponent",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/DyComponent.vue")
            }, {
                path: "/cfgPage",
                name: "cfgPage",
                meta: {
                    title: '攻击路径'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/CfgPage.vue")
            }, {
                path: "/dfgPage",
                name: "dfgPage",
                meta: {
                    title: '污点传播路径'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/DfgPage.vue")
            },
            {
                path: "/config",
                name: "config",
                meta: {
                    title: '配置'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/ConfigPage.vue")
            },
            {
                path: "/coverage",
                name: "coverage",
                meta: {
                    title: '覆盖率'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/CoveragePage.vue")
            },
            {
                path: "/bulletin",
                name: "bulletin",
                meta: {
                    title: '整体网络图'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/BulletinBoard.vue")
            },
            {
                path: "/network",
                name: "network",
                meta: {
                    title: '看板'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/NetworkPage.vue")
            },
            {
                path: "/keyasset",
                name: "keyasset",
                meta: {
                    title: '关键资产'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/KeyAsset.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
import config from "../config";

//pages
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Post from "../pages/post/Post";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import ChangePassWord from "../pages/changePassWord/ChangePassWord";

const publicRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.about,
    component: About,
  },
  {
    path: config.routes.post,
    component: Post,
  },
  {
    path: config.routes.login,
    component: Login,
  },
  {
    path: config.routes.register,
    component: Register,
  },
  {
    path: config.routes.profile,
    component: Profile,
  },
  {
    path: config.routes.changePassWord,
    component: ChangePassWord,
  },
];

const privateRouters = [];

export { publicRoutes, privateRouters };

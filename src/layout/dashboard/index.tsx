import ProLayout from "@ant-design/pro-layout";
import { Avatar } from "antd";
import auth from "api/auth";
import { AuthContext } from "context/AuthContext";
import { AuthActionTypes } from "context/AuthContext/type";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { BookOpen01, Logout01 } from "untitledui-js-base";
import menuData from "./menu";

const Logo = () => {
  return (
    <div>
      <BookOpen01 size="28" />
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const [user, dispatch] = useContext(AuthContext);
  if (!user.authorized) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <ProLayout
      style={{
        borderRadius: "100px",
      }}
      logo={<Logo />}
      title="AI Based News Dashboard"
      menuItemRender={(item, dom) => (
        <Link to={item.path as string} key={item.path}>
          {dom}
        </Link>
      )}
      contentStyle={{
        margin: 0,
        background: "#ebf2fc",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
      menu={{
        request: async () => {
          return menuData;
        },
      }}
      selectedKeys={[location.pathname]}
      siderWidth={300}
      stylish={{}}
      fixSiderbar={true}
      menuFooterRender={(props) => {
        if (props?.collapsed) {
          return (
            <div className="flex items-center justify-center">
              <Logout01
                color="#fff"
                className="cursor-pointer"
                onClick={() => {
                  dispatch({ type: AuthActionTypes.LOGOUT });
                  auth.removeToken();
                }}
              />
            </div>
          );
        }
        return (
          <div className="m-4 flex items-center justify-between text-white font-semibold">
            <div className="flex items-center gap-3">
              <Avatar size={50} src={user?.user?.file?.physicalPath}>
                IM
              </Avatar>
              <div className="flex flex-col gap-2">
                <div>{user?.user?.firstName}</div>
                <div>{user?.user?.phone}</div>
              </div>
            </div>
            <Logout01
              color="#fff"
              className="cursor-pointer"
              onClick={() => {
                dispatch({ type: AuthActionTypes.LOGOUT });
                auth.removeToken();
              }}
            />
          </div>
        );
      }}
      token={{
        sider: {
          colorTextMenuTitle: "#fff",
          colorMenuBackground: "#212e42",
          colorBgMenuItemSelected: "#202836",
          colorBgMenuItemHover: "#202836",
          colorTextMenu: "#fff",
          colorTextMenuSelected: "#fff",
          colorTextMenuItemHover: "#fff",
          menuHeight: 55,
        },
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default DashboardLayout;

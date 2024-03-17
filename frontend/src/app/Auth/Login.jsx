import { Link } from "react-router-dom";
import { useState } from "react";
import { useMyContext } from "../../component/context/AppContext";
import { POST } from "../../../functions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const { SetContentNotifi, setIsLogin } = useMyContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!userName || !password) {
            SetContentNotifi('Nhập đầy đủ thông tin!')
        } else {
            const response = await POST(`user/login`, {
                userName: userName,
                password: password
            }
            );
            if (response.status == 400 || response.status == 404) {
                alert('Tài khoản hoặc mật khẩu không chính xác!');
            } else {
                alert('Đăng nhập thành công!');
                Cookies.set('Todo', response.token);
                setIsLogin(true)
                return navigate("/Dashboard");
            }
        }
    }
    return (<>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng nhập tài khoản
                        </h1>
                        <div className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Tài khoản
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Nhập tài khoản"
                                    required=""
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={() => handleLogin()}
                            >
                                Đăng nhập
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn không có tài khoản?{" "}
                                <Link
                                    to='/Register'
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    )
}
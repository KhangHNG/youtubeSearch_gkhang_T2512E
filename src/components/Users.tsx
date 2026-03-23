interface Users {
    username: string;
    email: string;
    password: string;
    passwordHash: string;
    salt: string;
}
const submitForm = (e) => {
    e.preventDefault();
    const usernameValue = document.forms["SignUpForm"]["username"].value;
    const emailValue = document.forms["SignUpForm"]["email"].value;
    const passwordValue = document.forms["SignUpForm"]["password"].value;

    localStorage.setItem("username", usernameValue);
}
const Users = () => {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
            }}>
                <form className=" border-gray-200 border-2 bg-gray-100 p-5 h-full w-1/3 rounded-2xl " name={"SignUpForm"} onSubmit={submitForm}>
                    <h1 className="text-2xl font-bold text-center bg-blue-500 rounded-lg pt-2 pb-2">Form đăng kí người dùng</h1>
                    <div className="m-2 w-full">
                        <label htmlFor="username">Tên:</label>
                        <input type="text" placeholder="Username" name={"username"} id={"username"} className="rounded-lg pl-2 m-2 w-1/3"/>
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder="Email" id={"email"} name={"email"} className="rounded-lg pl-2 m-2 w-1/3"/>
                    </div>
                    <div className="m-2">
                        <label htmlFor={"password"}>Mật khẩu:</label>
                        <input type="text" placeholder="Mật khẩu" id={"password"} name={"password"} className="rounded-lg pl-2 m-2"/>
                    </div>
                    <div className="m-2">
                        <label htmlFor={"passwordCf"}>Kiểm tra mật khẩu:</label>
                        <input type="text" placeholder="Nhập lại mật khẩu" id={"passwordCf"} name={"passwordCf"} className="rounded-lg pl-2 m-2"/>
                    </div>
                    <div className="m-2  font-bold text-center">
                        <button value="submit" className="bg-blue-500 pl-3 pr-3 pt-2 pb-2 rounded-lg hover:bg-blue-900 hover:text-white">Đăng ký</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Users;
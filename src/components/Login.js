export default function Login() {
    return (
        <section className="vh-100">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6 text-black">

                    <div className="px-5 ms-xl-4 mt-5">
                        <i className="ti ti-twitter-alt ti-large me-3 pt-5 mt-xl-4" style={{color: "#709085" , fontSize: "xx-large"}}></i>
                        <span className="h1 fw-bold mb-0">Book</span>
                    </div>

                    <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                        <form style={{width: "23rem"}}>
                            <div className="text-danger"></div>

                            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

                            <div className="form-outline mb-4">
                                <label htmlFor="email">Email</label>
                                <input id="email" className="form-control form-control-lg" />
                                <span className="text-danger"></span>
                            </div>

                            <div className="form-outline mb-4">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" className="form-control form-control-lg"/>
                                <span className="text-danger"></span>
                            </div>

                            <div className="pt-3 mb-4">
                                <input type="submit" value="Login" className="btn btn-info btn-lg btn-block" />
                            </div>
                        </form>
                    </div>

                    <div className="px-5 ms-xl-4 mt-2 pt-5 pt-xl-0 mt-xl-n5">
                        <h3 className="fw-normal mb-3" style={{letterSpacing: "1px"}}>or</h3>

                        <p className="small mt-3 mb-5 pb-lg-2"><a className="text-muted" href="#">Back to Home</a></p>
                        <p>Don't have an account? <a href="#">Register here</a></p>
                    </div>
                </div>
                <div className="col-sm-6 px-0 d-none d-sm-block">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login image" className="w-100 vh-100" style={{objectFit: "cover" , objectPosition: "left"}}/>
                </div>
            </div>
        </div>
    </section>
    )
}
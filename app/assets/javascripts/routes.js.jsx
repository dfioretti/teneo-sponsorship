var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.AppRoutes = (
  <Route handler={App}>
    <Route name='account_login' handler={AccountLogin} path='/account_login' />
    <Route name='create_account' handler={CreateAccount} path='/create_account' />
    <Route name='password_recovery' handler={PasswordRecovery} path='/password_recovery' />
    <Route name='reset_password' handler={ResetPassword} path='/reset_password' />
    <Route name='choose_company' handler={CompanyIndex} path='ews/choose_company'/>
    <Route name='dashboard' handler={Dashboard} path='ews/dashboard/:id'/>
    <Route name='company_detail' handler={CompanyDetail} path='ews/dashboard/:id/detail'/>
    <Route name='fifa_dashboard' handler={FifaDashboard} path='fifa/dashboard'/>
    <Route name='users' handler={UsersIndex} path='admin/users'/>
    <DefaultRoute handler={CompanyIndex}/>
  </Route>
);

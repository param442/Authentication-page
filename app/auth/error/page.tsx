import ErrorPage from "@/components/ErrorPage";

const AuthErrorPage = () => {
  const description: string =
    "Hey this is auth error It can might through various reasons";
  return (
    <ErrorPage
      href="/auth/login"
      Page="Back to LogIn!"
      ClassName=""
      ErrorCode={401}
      description={description}>
      <h2>Authentication Error</h2>
    </ErrorPage>
  );
};
export default AuthErrorPage;

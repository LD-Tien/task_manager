export default function PrivateRouter({ isPass, redirect, children }) {
  if (isPass) {
    return <>{children}</>;
  } else {
    window.location.href = redirect;
    return <></>;
  }
}
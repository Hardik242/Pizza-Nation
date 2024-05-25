import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 text-lg">
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <div className="flex flex-col gap-3 text-xl">
        <LinkButton to="-1">&larr; Go back</LinkButton>
        <LinkButton to="/">&larr; Go to HomePage</LinkButton>
      </div>
    </div>
  );
}

export default Error;

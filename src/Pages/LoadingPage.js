import Spinner from "../Components/Spinner";

export default function LoadingPage() {
    return (
        <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </div>
    );
}
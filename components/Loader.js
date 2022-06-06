export default function Loader() {
    return (
        <div className="fixed bg-black bg-opacity-50 h-screen w-screen top-0 left-0 z-10">
            <div className="custom-loading absolute top-[calc(50vh-29px)] left-[calc(50vw-144px)]">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
            </div>
        </div>
    );
}
export const StreamCard = ({ stream }) => {
    const thumbnail = stream.thumbnail_url
        .replace("{width}", 320)
        .replace("{height}", 180);

    return (
        <div className="border rounded shadow p-4">
            <h2 className="font-bold text-lg mb-1 text-center">{stream.user_name}</h2>
            <p className="text-sm mb-2 text-center">{stream.title}</p>
            <iframe
                src={`https://player.twitch.tv/?channel=${stream.user_login}&parent=${window.location.hostname}`}
                height="300"
                width="100%"
                allowFullScreen
                className="rounded"
            />
        </div>
    );
};

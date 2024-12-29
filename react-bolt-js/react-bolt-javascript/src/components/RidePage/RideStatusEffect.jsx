import './RideStatusEffect.css';


export default function RideStatusEffect({status}){
    // Map each status to a specific color
    const statusColors = {
        REQUESTED: "blue",
        ONGOING: "green",
        COMPLETED: "red",
    };

    const color = statusColors[status] || "gray"; // Fallback to gray if status is unknown


    return (
        <div className="loading-tab" style={{ borderColor: color }}>
            <div className="loading-bar" style={{ backgroundColor: color }}></div>
            <span className="status-text">{status}</span>
        </div>
    );
}
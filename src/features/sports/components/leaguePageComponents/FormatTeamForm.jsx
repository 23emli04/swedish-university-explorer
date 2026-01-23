export default function FormatTeamForm({ form }) {
    return (
        <div className="flex justify-center">
            {form.slice(0, 5).map((result, i) => {
                let color =
                    result === "V"
                        ? "text-success"
                        : result === "O"
                            ? "text-grey-200"
                            : "text-error";
                return (
                    <span key={i} className={`mx-1 font-bold ${color}`}>
            {result}
          </span>
                );
            })}
        </div>
    );
}

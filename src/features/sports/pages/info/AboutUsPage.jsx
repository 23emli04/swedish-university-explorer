export default function AboutUsPage() {
    const team = [
        {
            name: "Emil Lindström Moffatt",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2FYbKhQrGQY2nJXVX_1712121324.png&f=1&nofb=1",
            email: "emilmoff@hotmail.com",
            github: "23emli04",
            linkedin: "https://www.linkedin.com/in/emil-lindstr%C3%B6m-moffatt-a27165221/",
        },
        {
            name: "Joar Morén",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2FYbKhQrGQY2nJXVX_1712121324.png&f=1&nofb=1",
            email: "Joar.Moren@live.se",
            github: "baronzapp",
            linkedin: "Kommer snart",
        },
        {
            name: "Hugo",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2FYbKhQrGQY2nJXVX_1712121324.png&f=1&nofb=1",
            email: "TODO",
            github: "HugoBjorklund",
            linkedin: "TODO",
        },
        {
            name: "Simon Lundgren",
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdata.ipic.ai%2Fimages%2FYbKhQrGQY2nJXVX_1712121324.png&f=1&nofb=1",
            email: "sim.lund@outlook.com",
            github: "simlund94",
            linkedin: "www.linkedin.com/in/simon-lundgren-32174a137/"
        },
    ];

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-5xl font-bold text-center mb-10">Om oss</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {team.map((member, index) => (
                    <div key={index} className="p-6 bg-base-300/50 rounded-xl flex flex-col items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={member.img} alt={member.name} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>

                        {member.email && (
                            <div className="flex items-center justify-center w-full">
                            <p className="text-gray-600 text-md">
                                Kontakt:
                            </p>
                                <a href={`mailto:${member.email}`} className="link-hover text-info">
                                    {member.email}
                                </a>
                                {" "}

                            </div>

                        )}

                        {member.phone && <p>Tel: {member.phone}</p>}

                        {member.github && (
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <a
                                    href={`https://github.com/${member.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-hover font-medium"
                                >
                                    GitHub: {member.github}
                                </a>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
                                </svg>
                            </div>
                        )}

                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-info mt-2 link-hover"
                            >
                                LinkedIn
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Hero(){
    return (<div className="hero bg-base-100 h-96">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hitta utbildningar, lärosäten och yrken</h1>
                <p className="py-6">
                    Din plattform för att hitta allt inom utbildning!
                </p>
                <input
                    type="text"
                    placeholder="Sök utbildningar, skolor eller jobb..."
                    className="input input-bordered max-w-md"
                />
            </div>
        </div>
    </div>);
}
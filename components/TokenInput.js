export default function TokenInput({ token, value, onChange }) {
    return (
        <div className="w-full min-w-[200px] h-12 grid grid-cols-[1fr_110px] gap-3 pr-3 items-center bg-slate-900 rounded-lg duration-75 focus-within:outline-orange-500 focus-within:outline">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value, token.symbol)}
                className="block text-white w-full h-full rounded-l-lg focus:outline-none pl-2 text-2xl font-bold bg-slate-800"
            />
            <div className="grid h-full py-2 grid-cols-[min-content_1fr] items-center gap-3">
                <div className="h-full w-8">
                    <img src={token.image} />
                </div>
                <div className="font-black text-2xl text-center">
                   {token.symbol}
                </div>
            </div>
        </div>
    );
}
interface RankingRow {
  user_id: string
  nickname: string
  name: string
  total_points: number
  exact_count: number
  winner_count: number
  bets_count: number
}

export default function GroupRanking({
  ranking,
  currentUserId,
}: {
  ranking: RankingRow[]
  currentUserId: string
}) {
  if (!ranking || ranking.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-8">Nenhuma aposta ainda.</p>
  }

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="card overflow-hidden p-0">
      <table className="w-full text-sm">
        <thead className="bg-brand-blue text-white text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-4 py-3 w-8">#</th>
            <th className="text-left px-4 py-3">Jogador</th>
            <th className="text-center px-2 py-3">🎯</th>
            <th className="text-center px-2 py-3">✅</th>
            <th className="text-center px-2 py-3">Apostas</th>
            <th className="text-right px-4 py-3">Pontos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((row, i) => (
            <tr
              key={row.user_id}
              className={`border-t border-gray-100 ${
                row.user_id === currentUserId ? 'bg-brand-yellow/10' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 font-bold text-gray-500">
                {medals[i] || i + 1}
              </td>
              <td className="px-4 py-3">
                <p className="font-semibold">{row.nickname}</p>
                <p className="text-xs text-gray-400">{row.name}</p>
              </td>
              <td className="text-center px-2 py-3 text-gray-600">{row.exact_count}</td>
              <td className="text-center px-2 py-3 text-gray-600">{row.winner_count}</td>
              <td className="text-center px-2 py-3 text-gray-400">{row.bets_count}</td>
              <td className="text-right px-4 py-3 font-bold text-brand-green text-base">
                {row.total_points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

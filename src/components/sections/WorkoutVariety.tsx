export default function WorkoutVariety() {
  const workouts = [
    '데드리프트',
    '벤치프레스',
    '스쿼트',
    '랫풀다운',
    '오버헤드프레스',
    '바벨컬',
    '트라이셉스 익스텐션',
    '레그프레스',
  ]

  return (
    <section id="workouts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            다양한 운동 루틴
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            세짐 한 대로 모든 상체, 하체 운동이 가능합니다
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              <span className="font-semibold text-center px-4">{workout}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            그리고 더 많은 운동이 가능합니다
          </p>
        </div>
      </div>
    </section>
  )
}

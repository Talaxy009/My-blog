export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} 阅读需要 ${minutes} 分钟`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')}阅读需要 ${minutes} 分钟`;
  }
}
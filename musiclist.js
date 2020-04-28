const musiclist = []
const push = (name, image = '', band, time = '', description = '')=>
musiclist.push({name, image, band, time, description})

push('彩虹山', 'RM.jpg', '文雀', '2012-09-12', '中国乐队——文雀的第二张专辑，曲风较为轻快磅礴')
push('Reistu tig vid, Solin er Komin a Loft...', 'RS.jpg', 'For a Minor Reflection', '2007-10-06', '来自冰岛的乐队，这是他们的首张专辑，将欲扬先抑发挥到了极致')
push('Who You Are Is Not Enough', 'WYRINE.png', 'Athletics', '2012-06-26', '来自美国的乐队，少见的人声后摇，同样将欲扬先抑发挥得淋漓尽致')
push('Passenger', 'Pg.jpg', 'RQTN', '2013-03-01', '曲风偏抑郁的法国后摇，入坑时听的几张专辑之一')
push('Laika Still Wants Go Home', 'LSWGH.jpg', 'Powder! Go Away', '2011-03-16', '来自俄罗斯的乐队，以前苏联的一次航空悲剧为背景的专辑，曲风偏抑郁，纪念了在人类科技进步下牺牲的生命们')
push('Ólgusjór', 'Ojr.jpg', 'Lockerbie', '2011-05-30', '充满童话气息的冰岛后摇')
//push('', '.jpg', '', '20', '')

module.exports = musiclist
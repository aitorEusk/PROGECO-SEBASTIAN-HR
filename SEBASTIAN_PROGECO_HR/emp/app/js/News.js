var Access = Access || {};
Access.News = Access.News || {};

Access.News.showNews = async function () {
  try {
    var codigo = '<ion-slides class="{{numNews|switch:[0:hidden]}}" pager="true" style="width: 100%;">';
    var news = await flexygo.sql.getTable(`SELECT News_Articles.*, COALESCE(News_Reads.ReadTimes, 0) AS ReadTimes FROM News_Articles LEFT JOIN News_Reads ON News_Articles.NewsId = News_Reads.NewsId AND News_Reads.EmployeeId = ${flexygo.conftoken.user.currentReference} WHERE EmployeeId is null LIMIT 10`);
	
    var total = parseInt(news.rows.length);
	    if (total === 0){
      		news = await flexygo.sql.getTable(`SELECT * FROM News_Articles ORDER BY PubDate DESC LIMIT 10`);
    	}
    
    for (let n of news.rows) {
      var title = n.Title || 'Título no disponible';
      var descrip = n.Descrip || 'Sin descripción';
        var articleId = n.NewsId;
      var tempElement = document.createElement('div');
		tempElement.innerHTML = descrip;
     
      const newsText = await Access.News.extractTextFromNode(tempElement);
        codigo += `<ion-slide onclick="Access.News.readNews(` + articleId + `,  ${ flexygo.conftoken.user.currentReference } )">` +
        `<ion-card class="novedades">` +
        `<ion-card-header>` +
        `<ion-card-title color="light"><b>` + title + `</b></ion-card-title>` +
        `</ion-card-header>` +
        `<ion-card-content style="max-height: 60px;overflow: hidden;">` +
        `<ion-text color="light">` +
        newsText +
        `</ion-text>` +
        `</ion-card-content>` +
        `</ion-card>` +
        `</ion-slide>`;
    }
    
    codigo += '</ion-slides>';
    
    return codigo;
  } catch (error) {
    return '<ion-text>Sin noticias por leer</ion-text>';
  }
};

Access.News.readNews = async function (NewsId, EmployeeId) {
    const currentDateTime = flexygo.utils.currentDateTime();
    const isRead = await flexygo.sql.getValue("SELECT CASE WHEN (SELECT ReadTimes FROM News_Reads WHERE NewsId = " + NewsId + " AND EmployeeId = " + EmployeeId + ") IS NULL THEN 0 ELSE 1 END");

    if (isRead === 0) {
        const query = `INSERT INTO News_Reads (NewsId, EmployeeId, FirstReadDate, LastReadDate, ReadTimes, Likes, NoLikes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [NewsId, EmployeeId, currentDateTime, currentDateTime, 1, 0, 0];

        // const read = await 

        flexygo.sql.execSQL(query, params);

        return flexygo.nav.goView("Offline_emp_News_Article", "Offline_emp_News_Article_View", "NewsId=" + NewsId);
    }
     
}


Access.News.extractTextFromNode= async function (node) {
  let text = '';

  // Si el nodo es de tipo texto, agrega su contenido al resultado
  if (node.nodeType === Node.TEXT_NODE) {
    text += node.textContent;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Si el nodo es un elemento, recorre sus nodos hijos
    for (const childNode of node.childNodes) {
      text += await Access.News.extractTextFromNode(childNode);
    }
  }
  return text;
};

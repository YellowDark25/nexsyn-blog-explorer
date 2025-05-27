<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Mapa do Site - Blog Nexsyn</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 30px;
            font-size: 2.2em;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .header {
            margin-bottom: 30px;
          }
          .summary {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 25px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          th, td {
            text-align: left;
            padding: 12px 15px;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #3498db;
            color: white;
            font-weight: 600;
          }
          tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          a {
            color: #2980b9;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .lastmod {
            white-space: nowrap;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #7f8c8d;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Mapa do Site - Blog Nexsyn</h1>
          <div class="summary">
            <p>Este é o mapa do site do Blog Nexsyn. Aqui você encontra uma lista de todas as URLs disponíveis para indexação.</p>
            <p>Total de URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></p>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Última Atualização</th>
              <th>Frequência de Atualização</th>
              <th>Prioridade</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}" target="_blank">
                    <xsl:value-of select="sitemap:loc" />
                  </a>
                </td>
                <td class="lastmod">
                  <xsl:value-of select="concat(
                    substring(sitemap:lastmod, 0, 11),
                    ' ',
                    substring(sitemap:lastmod, 12, 5)
                  )" />
                </td>
                <td>
                  <xsl:value-of select="sitemap:changefreq" />
                </td>
                <td>
                  <xsl:value-of select="sitemap:priority" />
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        
        <div class="footer">
          <p>Gerado em: <xsl:value-of select="current-dateTime()" /></p>
          <p>© <xsl:value-of select="year-from-date(current-date())" /> Nexsyn. Todos os direitos reservados.</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

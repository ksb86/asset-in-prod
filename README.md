#Asset In Production (overstock)

Plugin to test whether assets are present from outside the Overstock network (a heroku server). This can avoid false positives caused by a modified hosts file when on the Overstock network. 


1. Add the bookmarklet to chrome
2. Use when on a Code Deployment Request ticket page in Jira (i.e. https://jira.overstock.com/browse/FED-14292)
3. Asset on ticket will be requested from a server not in our network to verify it has been deployed to production.

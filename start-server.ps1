Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  DSU Registration Server Startup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Make sure MongoDB is running before starting!" -ForegroundColor Red
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

node server.js

Read-Host "Press Enter to exit"



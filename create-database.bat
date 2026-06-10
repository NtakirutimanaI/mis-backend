@echo off
echo Creating PostgreSQL database for Profile Backend System...
echo.

REM Try to create the database
psql -U postgres -c "CREATE DATABASE profile_db;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✓ Database 'profile_db' created successfully!
) else (
    echo Database might already exist or there was an authentication issue.
    echo.
    echo Trying to connect to check...
    psql -U postgres -d profile_db -c "\conninfo" 2>nul
    
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Database 'profile_db' already exists and is accessible!
    ) else (
        echo.
        echo ⚠ Could not create or access the database.
        echo.
        echo Please run this command manually:
        echo   psql -U postgres
        echo.
        echo Then run:
        echo   CREATE DATABASE profile_db;
        echo   \q
    )
)

echo.
pause

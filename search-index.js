// Search index for documentation
const searchIndex = [
    {
        id: 'index',
        title: 'Kezdőlap',
        url: 'index.html',
        category: 'Dokumentáció',
        content: 'Trading Bot Dokumentáció AI-alapú döntéshozó rendszer scalp intraday kereskedési stratégiák Binance USDT-M Futures Bevezetés Telepítés Funkciók Gyors kezdés'
    },
    {
        id: 'bothasznalat',
        title: 'Bot Használat',
        url: 'subpages/bothasznalat.html',
        category: 'Bot',
        content: 'Bot Használat parancssori alkalmazás Python argumentumok main.py strategy symbol test_mode prompt_only ai_only loop_time account capital log_file ETHUSDT BTCUSDT argumentumok futtatási módok példák'
    },
    {
        id: 'launcher',
        title: 'Launcher',
        url: 'subpages/launcher.html',
        category: 'Bot',
        content: 'Launcher egységes indító CLA Command Line Application log importer database update market context import-logs update all teljes frissítés Flask web interface'
    },
    {
        id: 'trend-monitor',
        title: 'Trend Monitor',
        url: 'subpages/trend_monitor.html',
        category: 'Bot',
        content: 'Trend Monitor periodikus futtatás trend analysis trend_data.json interval timeout végrehajtási idő statisztika sikeres futtatások breadth BTC ETH correlation'
    },
    {
        id: 'alapfogalmak',
        title: 'Alapfogalmak',
        url: 'subpages/alapfogalmak.html',
        category: 'Alapok',
        content: 'Alapfogalmak LTF HTF Low Time Frame High Time Frame timeframe guardrails VWAP confluence score market context risk management 1m 5m 15m 1h 4h EMA StochRSI volume'
    },
    {
        id: 'chris',
        title: 'Trend Mikró-időzítés',
        url: 'subpages/chris.html',
        category: 'Chris',
        content: 'Mikró-időzítés modul microtrend bias EMA9 EMA21 StochRSI OBV CVD order book snapshot belépési forma exit szabályok stop loss take profit trailing hard exit confluence scoring'
    },
    // Részletes szekciók
    {
        id: 'bot-args-strategy',
        title: 'Bot Használat - Strategy argumentum',
        url: 'subpages/bothasznalat.html#arguments',
        category: 'Bot',
        content: 'strategy argumentum basic_scalp new_scalp_intra_strategy_4 stratégia választás strategies könyvtár'
    },
    {
        id: 'bot-args-symbol',
        title: 'Bot Használat - Symbol argumentum',
        url: 'subpages/bothasznalat.html#arguments',
        category: 'Bot',
        content: 'symbol kereskedési szimbólum ETHUSDT BTCUSDT SOLUSDT BNBUSDT trading pair'
    },
    {
        id: 'bot-modes-prompt',
        title: 'Bot Használat - Prompt Only Mode',
        url: 'subpages/bothasznalat.html#modes',
        category: 'Bot',
        content: 'prompt only mode fejlesztés tesztelés prompt generálás AI hívás nélkül debug'
    },
    {
        id: 'bot-modes-ai',
        title: 'Bot Használat - AI Only Mode',
        url: 'subpages/bothasznalat.html#modes',
        category: 'Bot',
        content: 'AI only mode döntés lekérése kereskedés nélkül JSON formátum teszt'
    },
    {
        id: 'bot-modes-loop',
        title: 'Bot Használat - Loop Mode',
        url: 'subpages/bothasznalat.html#modes',
        category: 'Bot',
        content: 'loop mode folyamatos futtatás időköz ciklus automatikus ismétlés'
    },
    {
        id: 'launcher-cla',
        title: 'Launcher - CLA Indítása',
        url: 'subpages/launcher.html#actions',
        category: 'Bot',
        content: 'CLA indítása Flask web dashboard bot kezelés localhost:5000 web interface'
    },
    {
        id: 'launcher-import',
        title: 'Launcher - Log Importer',
        url: 'subpages/launcher.html#actions',
        category: 'Bot',
        content: 'log importer szegmentált log fájlok adatbázis import status grace period'
    },
    {
        id: 'launcher-update',
        title: 'Launcher - Database Update',
        url: 'subpages/launcher.html#actions',
        category: 'Bot',
        content: 'database update piaci adatok frissítés Binance API download import days symbol'
    },
    {
        id: 'alapok-ltf-htf',
        title: 'Alapfogalmak - LTF és HTF',
        url: 'subpages/alapfogalmak.html#ltf-htf',
        category: 'Alapok',
        content: 'LTF Low Time Frame HTF High Time Frame precedencia 1m 5m 15m 1h 4h momentum struktúra szűrő megerősítés'
    },
    {
        id: 'alapok-guardrails',
        title: 'Alapfogalmak - Guardrails',
        url: 'subpages/alapfogalmak.html#guardrails',
        category: 'Alapok',
        content: 'guardrails biztonsági feltételek atr_pct Vol_Ratio spread_bps data_freshness orderbook imbalance WAIT'
    },
    {
        id: 'alapok-vwap',
        title: 'Alapfogalmak - VWAP',
        url: 'subpages/alapfogalmak.html#vwap',
        category: 'Alapok',
        content: 'VWAP Volume Weighted Average Price volumen súlyozott átlagár támasz ellenállás retest relation distance bázispont'
    },
    {
        id: 'alapok-confluence',
        title: 'Alapfogalmak - Confluence Score',
        url: 'subpages/alapfogalmak.html#confluence',
        category: 'Alapok',
        content: 'confluence score pontozási rendszer LTF structure alignment VWAP support momentum market microstructure 0-5 skála minimum 3 pont'
    },
    {
        id: 'alapok-risk',
        title: 'Alapfogalmak - Risk Management',
        url: 'subpages/alapfogalmak.html#risk-management',
        category: 'Alapok',
        content: 'risk management kockázatkezelés RR ratio expected_rr_after_fees SCALP INTRADAY TP SL stop loss take profit trailing breakeven'
    },
    {
        id: 'chris-logika',
        title: 'Chris - Mikro-időzítés Logika',
        url: 'subpages/chris.html#logika',
        category: 'Chris',
        content: 'mikró-időzítés logika micro bias 1m 5m 15m EMA9 EMA21 StochRSI OBV CVD order book alapelv'
    },
    {
        id: 'chris-ema',
        title: 'Chris - Microtrend EMA',
        url: 'subpages/chris.html#szabalyok',
        category: 'Chris',
        content: 'microtrend EMA9 EMA21 stack keresztezés crossover trigger gyertya zárás debounce'
    },
    {
        id: 'chris-stochrsi',
        title: 'Chris - StochRSI',
        url: 'subpages/chris.html#szabalyok',
        category: 'Chris',
        content: 'StochRSI 14 14 3 3 overbought oversold K D keresztezés forduló bearish bullish'
    },
    {
        id: 'chris-volume',
        title: 'Chris - Volumenerő',
        url: 'subpages/chris.html#szabalyok',
        category: 'Chris',
        content: 'volumenerő OBV CVD trendirány momentum feltétel 20-bar átlag Z-score delta'
    },
    {
        id: 'chris-orderbook',
        title: 'Chris - Order Book',
        url: 'subpages/chris.html#szabalyok',
        category: 'Chris',
        content: 'order book snapshot imbalance topN bids asks fal likviditás DOM depth of market'
    }
];

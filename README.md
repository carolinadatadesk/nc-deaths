# nc-deaths
Analysis of causes of death in N.C. organized by county

## What we have so far
- A nearly-cleaned collection of all of the deaths and their causes in N.C. in 2015.

## How it works
1. Run ``npm install`` to install necessary Node packages.
2. Inside ``original/`` run ``python vitalstats.py`` to get the PDFs scraped.
3. Create an empty directory called ``data/``.
4. Inside that ``original/``, run ``process.sh`` to run the Tabula commands in your shell. This will take several minutes to complete, but when you're done, you'll have a CSV for each county.
5. Inside the home directory, run ``node process.js``.

## What you can expect
- Once this data is in an analyzable format, we'll be able to scrape the dataset for multiple years. (We're also working on just...requesting it...but that's taking a while, of course)

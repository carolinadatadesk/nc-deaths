echo "start script"
declare -a COUNTIES=(
alamance
alexander
alleghany
anson
ashe
avery
beaufort
bertie
bladen
brunswick
buncombe
burke
cabarrus
caldwell
camden
carteret
caswell
catawba
chatham
cherokee
chowan
clay
cleveland
columbus
craven
cumberland
currituck
dare
davidson
davie
duplin
durham
edgecombe
forsyth
franklin
gaston
gates
graham
granville
greene
guilford
halifax
harnett
haywood
henderson
hertford
hoke
hyde
iredell
jackson
johnston
jones
lee
lenoir
lincoln
macon
madison
martin
mcdowell
mecklenburg
mitchell
montgomery
moore
nash
newhanover
northampton
onslow
orange
pamlico
pasquotank
pender
perquimans
person
pitt
polk
randolph
richmond
robeson
rockingham
rowan
rutherford
sampson
scotland
stanly
stokes
surry
swain
transylvania
tyrrell
union
vance
wake
warren
washington
watauga
wayne
wilkes
wilson
yadkin
yancey
)

declare -a PAGES=(
52
23
13
24
21
15
33
20
28
40
59
37
48
36
12
32
19
46
34
22
17
14
42
31
45
64
17
19
48
26
34
60
32
69
30
54
14
10
31
18
80
36
41
30
43
20
23
9
47
24
47
12
32
35
34
23
18
23
25
96
18
21
39
40
49
20
46
38
15
26
28
16
28
44
18
43
30
52
41
46
34
37
24
32
26
36
17
22
8
44
29
91
21
16
22
45
32
39
24
15
)

## COUNT NUM OF PAGES IN EACH PDF
# for ((i=0;i<${#COUNTIES[@]};++i)); do
# echo $(pdfinfo "${COUNTIES[i]}".pdf | grep Pages | awk '{print $2}')
# done
# echo "pages printed."

## TRIM OFF FIRST PAGE IN EACH PDF
# for i in *pdf; do
#   pdftk "$i" cat 2-end output "trimmed/$i"
# done
# echo "TRIM COMPLETE."

## TABULA TEST
# tabula --pages 1-3 --outfile alleghany.csv alleghany.pdf

## TRANSLATE INTO CSV
for ((i=0;i<${#COUNTIES[@]};++i)); do
    printf "%s has %s pages\n" "${COUNTIES[i]}" "${PAGES[i]}"
    tabula --pages 1-"${PAGES[i]}" --outfile "${COUNTIES[i]}".csv "${COUNTIES[i]}".pdf
done
echo "TABULA COMPLETE."





echo "end script"

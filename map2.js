var map, overlay;
var initialOpacity = 0.5;
var OPACITY_MAX_PIXELS = 57; // Width of opacity control image

var charts = [["CBACncrd",37.93333,-122.03333,"CBA Concord Observatory","A private <a href=http://www.lewcook.com/cbacal.htm>Observatory</a>. Part of the <a href=>Center for Backyard Astrophysics.",3],
    ["PnncCmpCA",36.4899,-121.15029,"Pinnacles Campground","<a href=https://www.nps.gov/pinn/planyourvisit/camp.htm>Campground</a> at the east entrance of <a href=https://www.nps.gov/pinn/index.htm>Pinnacles National Park</a>.",10],
    ["Caltech",34.13565,-118.12627,"California Institute of Technology","<a href=https://www.caltech.edu/>Research and education institution</a> with  <a href=http://www.astro.caltech.edu/outreach/>astronomy outreach events</a>.",1],
    ["DrksByCA",38.02776,-122.96190,"Drakes Bay visitors center","Officially the <a href=https://www.nps.gov/pore/planyourvisit/visitorcenters.htm#CP_JUMP_63133>Kenneth C. Patrick Vistor Center</a>. Site of <a href=http://www.ptreyes.org/camps-classes-programs/field-institute/class-topics/outdoor-activities>astronomy classes</a> at the  <a href=https://www.nps.gov/pore/index.htm>Point Reyes National Seashore</a> national park. ",9],
    ["CSnzScrObCA",32.99275,-117.01099,"Hawks Landing Observatory","A private observatory",4],
    ["PscdrCA",37.2552,-122.383,"Pescadero","",7],
    ["StrCmpObCA",34.291,-116.3827,"Star Camp Observatory","A private <a href=http://www.starcampobservatory.com/>observatory</a>.",8],
    ["DvPchBwCA",34.41458,-117.86028,"Devil's Punchbowl Trailhead","A Los Angeles County Park in <a href=http://www.devils-punchbowl.com/>Devil's Punchbowl Natural Area</a>. Near Pearblossom.",6],
    ["SnOnfrSBCA",33.37591,-117.56868,"San Onofre State Beach","<a href=http://www.parks.ca.gov/?page_id=647>State beach</a> just south fo San Clamente.",5],
    ["KngtSgtCA",34.84202,-117.32789,"Knight Sight","A private site in Helendale",8],
    ["TBshpRhCA",38.54573,-122.87270,"The Bishop's Ranch","<a href=http://www.bishopsranch.org/>Retreat and conference center.",6],
    ["MnRsVnCA",33.99700,-118.47805,"Venice Stargazing Meet Up","A parking lot at 228 Main Street, in Venice. Site of starparties held by the <a href=http://www.meetup.com/Venice-Stargazing/>Venice Stargazing Meet Up</a>.",1],
    ["MryLwnObCA",34.14206,-117.87209,"Maury Lewin Astronomical Observatory","A private observatory in Glendora.",2],
    ["CprtnCA",37.323,-122.0322,"Cupertino","",2],
    ["MnPkCA",37.453,-122.1817,"Menlo Park","",2],
    ["MtnVwCA",37.3861,-122.0839,"Mountain View","",2],
    ["TpngCA",34.0919,-118.6021,"Topanga","",3],
    ["StnFcObCA",37.41761,-122.15949,"Stanford Faculty Observatory","A private observatory of a faculty member of <a href=http://www.stanford.edu/>Stanford University</a>.",2],
    ["CdbkLkCA",35.3221,-117.46708,"Cuddeback Lake","A dry lake.",11],
    ["WdndHsCA",34.1654,-118.609,"Woodland Hills","",2],
    ["BgStmpCA",36.72088,-118.97097,"Big Stump","An entrance to <a href=http://www.nps.gov/seki/planyourvisit/driving-directions.htm>Sequoia & Kings Canyon</a> national park. Used as a backup observing site of the <a href=http://www.cvafresno.org/>Central Valley Astronomers</a>.",11],
    ["GualalaCA",38.7657,-123.5281,"Gualala","",10],
    ["PgntObCA",32.95928,-117.12881,"Pageant Avenue Observatory","A private observatory.",2],
    ["MdwVwObCA",39.77376,-121.81818,"Meadow View Observatory","A private observatory.",5],
    ["LckwdVyRdCA",34.69313,-119.33729,"Lockwood Valley Road","A spot along Lockwood Valley road near Hwy 33.",10],
    ["ECrsCA",33.64711,-117.41203,"El Cariso","A peak in the Santa Ana mountains at the end of Upper Carisio Rd. ",5],
    ["TkRCCA",41.95015,-121.47582,"Tulelake","A site of the <a href=http://www.tnorecon.net/>RECON</a> project",10],
    ["CrdvCA",41.52783,-120.17849,"Cedarville","A site of the <a href=http://www.tnorecon.net/>RECON</a> project",11],
    ["QncyCA",39.93840,-120.94674,"Quincy","A site of the <a href=http://www.tnorecon.net/>RECON</a> project",8],
    ["PrtRCCA",39.80129,-120.46660,"Portola","A site of the <a href=http://www.tnorecon.net/>RECON</a> project",9],
    ["GrnvCA",40.13923,-120.94427,"Greenville","A site of the <a href=http://www.tnorecon.net/>RECON</a> project",10],
    ["PnCrkTrhCA",32.8375,-116.54155,"Pine Valley Creek trailhead","<a href=http://www.friendsoftheriver.org/site/PageServer?pagename=FORCalRiversPineValleyCreek>Trail</a> in the <a href=http://en.wikipedia.org/wiki/Cleveland_National_Forest>Cleveland National Forest</a> in California.",8],
    ["UCSDCA",32.88003,-117.23402,"University of Califoria San Diego","<a href=http://ucsd.edu/>UCSD</a> is actually located in La Jolla</a>.",2],
    ["MrcdCA",37.3022,-120.483,"Merced","",4],
    ["HnfrdCA",36.3275,-119.6457,"Hanford","",4],
    ["CrstyPkCA",33.06853,-116.58058,"Curiosity Peak Observatory","A private <a href=http://curiositypeak.us/>observatory</a>.",8],
    ["TrnPnCA",35.61688,-117.37011,"Trona Pinnacles","A <a href=http://www.blm.gov/ca/st/en/fo/ridgecrest/trona.html>BLM</a> site in the north Mojave desert.",11],
    ["LghtHdObCA",38.84864,-120.01803,"Lightholder Optics Observatory","Observatory of <a href=http://lightholderoptics.com/>Lightholder Optics</a>.",7],
    ["SLkThCA",38.9399,-119.9772,"South Lake Tahoe","",5],
    ["RstcVyObCA",33.75409,-116.21900,"Rustic Valley Observator","A private observatory.",3],
    ["ChVstObCA",32.64842,-117.02347,"Chula Vista Observatory","A private observatory.",2],
    ["SCRObCA",39.2367,-121.0444,"NCC Robotic Observatory","<a href=http://astronomy.sierracollege.edu/nccro/>Observatory</a> of  <a href=http://www.sierracollege.edu>Sierra College</a> in Grass Valley.",6],
    ["FullrtnCA",33.8704,-117.9243,"Fullerton","",0],
    ["PnrtwnCA",34.172,-116.54688,"Pioneertown Mountains Preserve","<a href=http://www.wildlandsconservancy.org/preserve_pioneertown.html>Wildlife preserve</a> used by the  <a href=http://www.sbvaa.org/>San Bernardino Valley Amateur Astronomers</a>.",8],
    ["CchmLkCA",34.57061,-119.94883,"Cachuma Lake Recreation Area","<a href=http://www.countyofsb.org/parks/parks05.aspx?id=13440>Recreation area</a> used by the <a href=http://www.sbau.org/>Santa Barbara Astronomical Unit</a> (SBAU).",9],
    ["RckSprObCA",33.14663,-117.11938,"Rock Springs Observatory","A private observatory.",2],
    ["PtRchmdCA",37.9225,-122.383,"Point Richmond","",3],
    ["SntCrzCA",36.9741,-122.0308,"Santa Cruz","Home of the <a href=http://astronomy.santa-cruz.ca.us/>Santa Cruz Astronomy Club</a>.",4],
    ["DvsCA",38.545,-121.739,"Davis","A town in Yolo county.",4],
    ["LklyPlcRVCA",41.21564,-120.47831,"Likely Place Golf & RV Resort","<a href=>golf course and RV resort</a>. Home of the <a href=http://www.stellarvue.com/Stellartrips/dssp/dssp.html>Stellarvue Dark Sky Star Party</a>.",14],
    ["CspWdPkCA",33.53386,-117.55066,"Caspers Wilderness Park","<a href=http://ocparks.com/parks/ronald/>Campground</a> and site of an <a href=http://www.onestar-awb.org/starry-night>International Starry Night</a> starparty to observe the 2013  Perseids. ",4],
    ["HmStkCpCA",36.63805,-117.57437,"Homestake Dry Camp","Minimal <a href=http://www.birdandhike.com/Hike/DEVA/Camps/Homestake/_Homestake.htm>campground</a> in <a href=http://www.nps.gov/deva/index.htm>Death Valley National Park</a>.",13],
    ["RchRCA",33.03449,-117.16528,"Rancho del Rio Observatory","A private observatory",3],
    ["MrrsnPntCA",37.77,-122.46587,"Morrison Planetarium","<a href=http://www.calacademy.org/academy/exhibits/planetarium/>Planetarium</a> at the <a href=http://www.calacademy.org/>California Academy of Sciences</a>. In San Francisco.",2],
    ["CrpsObCA",32.90409,-117.10138,"Scripps Ranch Observatory","A private observatory.",3],
    ["LmrCA",36.3008,-119.7819,"Lemoore","A town in  Kings county.",5],
    ["LcrnVyCA",34.444,-116.967,"Lucerne Valley","Used by the <a href=http://www.sbvaa.org/>San Bernardino Valley Amateur Astronomers</a>. In San Bernardino county.",7],
    ["OkGlnCA",34.03948,-116.94096,"Oak Glen Preserve","Wildlife <a href=http://www.wildlandsconservancy.org/preserve_oakglen.html>preserve</a> of <a href=http://www.wildlandsconservancy.org/>The Wildlands Conservancy</a> used by the <a href=http://www.sbvaa.org/>San Bernardino Valley Amateur Astronomers</a>. ",6],
    ["MtSacObCA",34.0453,-117.8462,"Mt. SAC Observatory","Observatory of <a href=http://www.mtsac.edu/>Mount San Antonio College</a>. In Walnut.",1],
    ["BryCrkCA",40.62083,-122.57166,"Brandy Creek Boat Ramp","Used by some members of the <a href=http://www.shastaastronomyclub.com/>Shasta Astronomy Club</a>. On Whiskytown Lake. Forecast covers the <a href=http://www.nps.gov/whis/index.htm>Whiskytown National Recreation Area</a>.",9],
    ["LBMnOCA",33.07914,-116.43696,"LaBelle Observatory","A private observatory.",9],
    ["DsrtHtSpCA",33.94606,-116.48796,"Desert Hot Springs","A town in Riverside county and site of star parties at the Two Bunch Palms Resort & Spa.",5],
    ["PrdRACA",38.28472,-120.86501,"Pardee Reservoir Recreation Area","<a href=http://www.pardeelakerecreation.com/>Recreation area</a> used as an observing site by the <a href=http://www.stocktonastro.org/>Stockton Astronomical Society</a>.",8],
    ["AwhObCA",37.37780,-119.71186,"Ahwahnee Hills Observatory","A private observatory located in Ahwahnee.",8],
    ["MbRgPkCA",34.73083,-114.50527,"Moabi Regional Park","<a href=http://cms.sbcounty.gov/parks/Parks/MoabiRegionalPark.aspx>Park</a> in Needles.",8],
    ["G74CA",33.22503,-117.1147,"Boulder Knolls Observatory","A private observatory, with Minor Planet Center code G74.",4],
    ["DnPdrCA",37.83215,-120.34883,"Don Pedro Reservoir","Centered on a public scenic outlook at the north end of <a href=http://www.donpedrolake.com/index.htm>lake and recreation area</a>.",9],
    ["NrthStrThCA",39.24006,-120.13890,"Northstar Ski Resort","<a href=http://www.northstarattahoe.com/>Resort</a> and site of <a href=http://www.northstarattahoe.com/info/summer/tahoe_star_tours.asp>commercial star tours</a>. Near Lake Tahoe.",8],
    ["ESgndCA",33.92747,-118.41214,"El Segundo","",1],
    ["WskTwnRACA",40.58814,-122.54141,"Whiskeytown National Recreation Area","A <a href=http://www.nps.gov/whis/index.htm>national recreation area</a> west of Redding. This chart is centered on the parking lot of the Shasta Mine Loop Trailhead. It is site of <a href=http://www.nps.gov/whis/skyranger.htm>astronomy programs</a> led by the park rangers and is used as an observing site by the  <a href=http://www.shastaastronomyclub.com/>Shasta Astronomy Club</a>. ",8],
    ["ShtRckCA",38.62472,-120.19555,"Shot Rock","A spot along the Carson Pass Highway.",11],
    ["RyrOkObCA",36.21115,-118.81262,"Royer Oaks Observatory","An <a href=http://www.royeroaks.com/>observatory</a> with <a href=http://www.royeroaks.com/starparties.html>public star parties</a>.",10],
    ["SpgvCA",36.13,-118.817,"Springville","A town in Tulare county and home of the <a href=http://www.astrospringville.org/TRAA/>Tule River Amateur Astronomers</a>",9],
    ["CrdnPkCA",36.29368,-120.68155,"Condon Peak Campground","A <a href=http://www.blm.gov/ca/st/en/fo/hollister/recreation/condon_peak.html>campground</a> on BLM land.",12],
    ["LgnObCA",34.08731,-119.06317,"Lagoon Observatory","A private observatory.",6],
    ["ShtrCvCA",40.031,-124.072,"Shelter Cove","A town in Humboldt county. ",13],
    ["TrlckCA",37.495,-120.846,"Turlock","A town in Stanislaus county.",4],
    ["RCDOCA",37.14706,-121.77515,"Rancho Ca�ada del Oro"," An <a href=http://www.openspaceauthority.org/trails/rancho.html>Open Space Preserve</a> of the <a href=http://www.openspaceauthority.org/>Santa Clara County Open Space Authority</a>. Used by the  <a href=http://www.sjaa.net/>San Jose Astronomical Association</a> for public outreach.",5],
    ["GlxObsObCA",33.05833,-116.57472,"Galaxy Gazers Observatory","A private observatory near Julian.",8],
    ["WltzrdCA",38.94108,-121.39418,"Waltz Road","A a spot along Waltz road. Near Wheatland.",6],
    ["EstmLkCA",37.21935,-119.96597,"Eastman Lake Recreation Area","<a href=http://corpslakes.usace.army.mil/visitors/projects.cfm?Id=L268004>Recreation area</a> used by the <a href=http://cvafresno.org/>Central Valley Astronomers</a>.",10],
    ["GMARSCA",34.28987,-116.38371,"Goat Mountain Astronomical Research Station","aka <a href=http://www.rivastro.org/gmars.php>GMARS</a>. MPC observatory G79.",8],
    ["JhsnVllyCA",34.43416,-116.63489,"Johnson Valley","A town in San Bernardino county.",9],
    ["WhtWtPrCA",33.98841,-116.65573,"Whitewater Preserve","<a href=http://www.wildlandsconservancy.org/preserve_whitewater.html>Preserve</a> of the <a href=http://www.wildlandsconservancy.org/index.html>The Wildlands Conservancy</a> and site of public star parties. In Whitewater Canyon.",7],
    ["MrshllCA",38.161,-122.893,"Marshall","A town in Marin county by Tomales Bay.",9],
    ["CrkPsCA",34.07384,-115.55102,"Clarks Pass","A a spot along highway 62.",12],
    ["MrFmObCA",34.18741,-117.31897,"Murillo Family Observatory","<a href=http://www.facebook.com/pages/Murillo-Family-Observatory-Cal-State-San-Bernardino/117763398310090>Observatory</a> of the <a href=http://www.csusb.edu/>California State University, San Bernardino</a>.",3],
    ["LwstnLkCA",40.76033,-122.78622,"Lewiston Lake","A public parking area on Lewiston Lake.",11],
    ["MxwObCA",39.25194,-121.04222,"James Clerk Maxwell Observatory","A private observatory near Nevada City.",6],
    ["GMDRCCA",34.78387,-115.65928,"GMDRC","The <a href=http://granites.ucnrs.org/>Granite Mountain Desert Research Center</a>. Lands are not open to the general public. Visitors must make reservations.",13],
    ["BrrgSpCA",33.256,-116.374,"Borrego Springs","Home to the <a href=http://nightfallstarparty.com/>Nightfall</a> star party, held by the <a href=http://www.rivastro.org/index.php>Riverside Astronomical Society</a> (RAS) at the <a href=http://www.palmcanyonresort.com/>Palm Canyon Resort</a>.",8],
    ["OkCnPkCA",34.18604,-118.77186,"Oak Canyon Park","A <a href=http://www.rsrpd.org/park/oakcanyoncommunitypark/oakcanyoncommunitypark.html>park</a> in town of Oak Park.",3],
    ["CrmlCA",36.55519,-121.92327,"Carmel","",6],
    ["SkyLimObCA",34.0787,-116.0355,"The Sky's The Limit Observatory and Nature Center","<a href=http://www.skysthelimit29.org/>Observatory and nature center</a> in Twentynine Palms.",9],
    ["SrSkObCA",38.67058,-121.08792,"Sierra Skies Observatory","A private <a href=http://www.sierraskiesobservatory.com/>observatory</a>.",3],
    ["LckwdObCA",32.86896,-116.6344,"Lockwood Observatory","A private observatory.",7],
    ["GrnHkObCA",37.34168,-122.02976,"Greenhawk Observatory","A private observatory.",2],
    ["BrSpObCA",37.71586,-122.0789,"Barking Spider Observatory","A private observatory near Castro Valley.",3],
    ["StlnSSPCA",33.39475,-115.79864,"Salton Sea State Recreation Area","<a href=http://www.parks.ca.gov/?page_id=639>State park</a> used by some members of the <a href=http://www.pvaa.us/>Pomona Valley Amateur Astronomers</a>",10],
    ["FrstVlCA",38.474,-122.889,"Forestville","A town in Sonoma county.",6],
    ["JSAATCA",34.20517,-116.24342,"Joshua Tree Astronomy Arts Theater","Used by the <a href=http://www.scdva.org/>Southern California Desert Video Astronomers</a>. Located at <a href=http://jtlake.com/>Joshua Tree Lake RV & Campground</a>.",8],
    ["MgFltCmpCA",36.23000,-117.06857,"Mahogany Flat Campground","A <a href=http://travel.yahoo.com/p-parks-221003-mahogany_flat_campground_death_valley_camping-i>0campground</a> in  <a href=http://www.nps.gov/deva/>Death Valley National Park</a>.",13],
    ["BmLkCA",40.93399,-121.54737,"Baum Lake","",13],
    ["SddlbckObCA",39.635,-120.863,"Saddleback Observatory","A  private observatory.",12],
    ["RsmdSPCA",34.8705,-118.20541,"Rosamond Skypark","A private residential <a href=http://www.skypark.org/>skypark</a> in Rosamond.",6],
    ["VslaCA",36.33,-119.291,"Visalia","A town in Tulare.",3],
    ["WlsonHllObCA",40.47320,-121.88209,"Wilson Hill Observatory","A private <a href=http://who.mayda.com/>observatory</a> near Shingletown.",10],
    ["HlmsObCA",37.10385,-122.05133,"Holmes Observatory","A private observatory near Lompico.",6],
    ["FtSciCtrCA",32.73131,-117.14814,"Reuben H. Fleet Science Center"," <a href=http://www.rhfleet.org/>Science center</a> at  <a href=http://www.balboapark.org>Balboa Park</a>. Site of  <a href=http://www.yearofscience2009.org/calendar/events/index.php?com=detail&eID=66195&year=2009&month=12>Stars in the Park</a> public star parties held by the <a href=http://www.sdaa.org>San Diego Astronomy Association</a>. in San Diego.",1],
    ["RVstCA",38.156,-121.69,"Rio Vista","A town in Solano county.",6],
    ["CARMACA",37.28045,-118.14187,"CARMA","An <a href=http://bima.astro.umd.edu/>array of millimeter-wave radio telescopes</a>.",13],
    ["LMsUrObCA",36.58518,-121.87932,"La Mesa Urban Observatory","A private <a href=http://lamesaobservatory.com/>observatory</a> in Monterey.",5],
    ["EglLkCA",40.66555,-120.77496,"Eagle Lake","Site of public astronomy session by <a href=http://www.flickr.com/photos/697650grr/sets/72157622404811476/>Bateson Observatory</a> personnel.",13],
    ["PrkfldCA",35.9,-120.432,"Parkfield","A town in Monterey county.",11],
    ["RbcnObCA",39.23303,-123.19131,"Rubicon Observatory","A private observatory of a member of the <a href=http://www.u-a-s.org./>Ukiah Astronomical Society</a>. Near lake Mendocino.",8],
    ["NwnVstCA",37.30072,-121.10408,"Newman Vista Point","A lookout on Interstate 5.",7],
    ["BrVlAlpCA",38.465,-120.039,"Bear Valley","A town in Alpine county.  Forecast also covers Tamarack and Lake Alpine.",11],
    ["MtShstCA",41.31,-122.309,"Mount Shasta","A town in Siskiyou county. Home of the <a href=http://www.mtshastastargazers.com/>Mount Shasta StarGazers</a>",8],
    ["LMsCA",32.768,-117.022,"La Mesa","A town in San Diego county.",2],
    ["AnglsCA",38.068,-120.539,"AngelKillarney s City","AKA Angels Camp. A town in Calaveras county.",7],
    ["TlscpRwCA",37.3361,-121.715,"Telescope Row","A <a href=http://www.hallsvalley.org/tr/tr.html>parking lot</a> in <a href=http://www.hallsvalley.org/where/grant/grant.html>Joeseph D. Grant County Park</a> used by the <a href=http://www.hallsvalley.org/>Halls Valley Astronomical Group</a> for public star parties.",5],
    ["ChmbCrkCA",39.35194,-123.55833,"Chamberlain Creek Rest Stop","A public <a href=http://www.panoramio.com/photo/6656885>rest-stop</a> on Highway 20.",13],
    ["HvnPtlCA",38.36957,-120.44037,"Heaven's Plateau","Site of future private observatory, Frequented by some members of the <a href=http://www.stocktonastro.org/>Stockton Astronomical Society </a>. Near Wilseyville.",10],
    ["SDCEBObCA",33.01639,-116.80856,"Tassi Observatory","A private observatory near Ramona.",6],
    ["OrlndCA",39.74478,-122.18417,"Orland","A town in Glenn.",7],
    ["CrsOHVCA",34.2244,-114.20856,"Crossroads OHV Area","Near Earp.",8],
    ["DwdyRnhCA",37.11251,-121.35781,"Dowdy Ranch Visitor Center","South-eastern visitors center of <a href=http://www.coepark.org/>Henry Coe State Park</a>. Site of local boy-scout <a href=http://www.troop799.net/dowdy.html>astronomy events</a>.",8],
    ["SmmttvwOCA",37.13611,-121.97333,"Summit View Observatory","A private observatory in the Santa Cruz Mountains.",5],
    ["TwGtsObCA",34.62501,-118.30464,"Two Goats Observatory","A private site affiliated with the <a href=http://www.avastronomyclub.org/>Antelope Valley Astronomy Club</a>.",5],
    ["WstYl1CA",40.88736,-120.04675,"WYA Eastern Lassen Site","A informal site used by the West Yolo Astronomers in the <a href=http://www.fs.fed.us/r5/lassen/recreation/wilderness/>Lassen National Forest</a> near the town of  Red Rock.",14],
    ["VstHllCA",37.3656,-122.1801,"Vista Hill","A lookout in <a href=http://www.cityofpaloalto.org/depts/csd/parks_and_open_space/preserves_and_open_spaces/foothills_park.asp>Foothills Park</a> in Palo Alto. Site of star parties held by the <a href=http://www.foothill.fhda.edu/ast/pas.htm>Peninsula Astronomical Society</a>.",4],
    ["RlngRfObCA",34.22489,-118.87250,"Rolling Roof Observatory","A private observatory near Thousand Oaks.",3],
    ["PpsFltCA",37.01776,-118.11942,"Papoose Flat","A public spot in the Inyo Mountains southeast of Big Pine.",13],
    ["CttnwdSCA",40.386,-122.28,"Cottonwood","A town in Shasta county.",7],
    ["GrndHsCA",34.265,-118.522,"Granada Hills","",1],
    ["ThchpApCA",35.13,-118.44,"Tehachapi Municipal Airport","An observing site of the <a href=https://plus.google.com/u/0/communities/103850750437332782273>Greater Tehachapi Astronomers</a>.",6],
    ["CstrVlyCA",37.694,-122.085,"Castro Valley","",2],
    ["DARCObCA",36.71333,-120.85527,"D.A.R.C. Observatory","A private observatory near Mercy Hot Springs.",11],
    ["PCmgCA",37.35910,-118.43410,"Bishop Observatory","A private observatory north of Bishop.",7],
    ["IvRgPkCA",33.79840,-117.75137,"Irvine Regional Park","A <a href=http://www.ocparks.com/irvinepark/>park</a> in Orange county.",2],
    ["LvBdNMCA",41.714,-121.509,"Lava Beds National Monument","<a href=http://www.nps.gov/labe>National monument</a>",13],
    ["TjngObCA",34.27097,-118.30041,"Tujunga Observatory","A private observatory in Tujunga.",2],
    ["TblMtObCA",34.38166,-117.68166,"Table Mountain Observatory","Observatory at <a href=http://tmf-web.jpl.nasa.gov/>Table Mountain Facility</a> which is operated by <a href=http://www.jpl.nasa.gov/>JPL</a>. Near Wrightwood.",5],
    ["SmnCA",38.28888,-122.45888,"Sonoma","",5],
    ["AmbyCtCA",34.55683,-115.7811,"Amboy Crater","Centered on the parking lot of <a href=http://www.blm.gov/ca/st/en/fo/needles/amboy.html>Amboy Crater</a>, a public nature site near the town of Amboy.",12],
    ["HngtnBCA",33.66,-117.998,"Huntington Beach","",2],
    ["RssCrkObCA",37.244,-121.93666,"Ross Creek Observatory","A private observatory in San Jose.",3],
    ["SchnvrPkCA",36.6585,-121.757,"Schoonover Park","Park, and neighborhood,  in the town of Marina.",5],
    ["DblVyCCA",37.96778,-122.07431,"Diablo Valley College","<a href=http://www.dvc.edu/>College</a> near Concord.",2],
    ["GSSPCA",41.1865,-120.95438,"Golden State Star Party","The GSSP is a <a href=http://www.goldenstatestarparty.org/>star party</a> held by the <a href=http://www.observers.org/>The Astronomy Connection</a>(TAC). Near Adin.",12],
    ["PrmntSCA",36.34007,-117.46869,"Panamint Springs","The best place to observe is the <a href=http://www.deathvalley.com/services/services.shtml>campground</a>.",13],
    ["LdCA",38.13,-121.271,"Lodi","",3],
    ["HympmCA",40.618,-123.451,"Hyampom","",13],
    ["TlbtWCA",34.5864,-115.477,"Trilobite Wilderness","A <a href=http://www.blm.gov/ca/pa/wilderness/wa/areas/trilobite.html>Wilderness Area<a> of geological interest. It's also a dark observing spot.",13],
    ["ASchCA",33.52305,-116.79694,"Lake Riverside Estates","A private community in Aguanga.",7],
    ["PynCrCA",40.27803,-122.18178,"Paynes Creek Wetlands","<a href=http://www.blm.gov/ca/st/en/fo/redding/recreationmain/reddingrecreationtrails.html>Trail system and picnic area</a>.",9],
    ["ThchpMObCA",35.13777,-118.49111,"Tehachapi Mountain Observatory","A private observatory near Tehachapi.",6],
    ["PlnCA",34.47022,-117.55585,"Phelan","",6],
    ["OCAGTGCA",33.90011,-117.85172,"OCA Go-To Group","A private observing site in Placentia, used by some members of the <a href=http://www.ocastronomers.org/>Orange County Astronomers</a>.",1],
    ["BrntwdCA",37.932,-121.695,"Brentwood","Forecast also covers Byran and Oakley.",4],
    ["LvrmrCA",37.682,-121.767,"Livermore","Home of the <a href=http://www.trivalleystargazers.org/>Tri-Valley Stargazers</a> astronomy club.  Forecast also covers Pleasanton.",3],
    ["A52ObCA",34.262,-119.259,"Area 52 Observatory","A private observatory near Ventura.",3],
    ["CarzPNMCA",35.09027,-119.73157,"Carrizo Plain National Monument","Centered on KCL Campground, this chart covers most of <a href=http://www.blm.gov/ca/bakersfield/carrizoplain/carrizoplain.html>Carrizo Plain National Monument</a>. Near Taft.",10],
    ["LmKlnPCA",36.02787,-121.53582,"Limekiln State Park","<a href=http://www.parks.ca.gov/?page_id=577>State park</a> near Big Sur. Forcast also covers the <a href=http://www.topozone.com/map.asp?lat=36.0519&lon=121.495&datum=NAD83&u=5>lookout tower</a> at <a href=http://www.summitpost.org/mountain/rock/150519/cone-peak.html>Cone Peak</a>.",13],
    ["FrmntCA",37.548,-121.988,"Fremont","The town in Alameda country.",2],
    ["BBLSOCA",34.265,-116.89166,"Big Bear Solar Observatory","Aka BBSO. <a href=http://www.bbso.njit.edu/>Solar Observatory</a> operated by the <a href=http://www.njit.edu/>New Jersey Institute of Technology</a>. On Big Bear Lake.",5],
    ["GrySksObCA",34.16666,-118.44166,"Bright Skies Observatory","A private observatory to promote the science and technology of CCD based astro-photography in light polluted areas.",1],
    ["PnFlObcA",35.872,-118.639,"Pine Flat Observatory","A private <a href=http://mysite.verizon.net/resw87kh>observatory</a> near California Hot Springs.",11],
    ["StaMrCA",34.953,-120.435,"Santa Maria","In Santa Barbara county.",4],
    ["SFSUObCA",37.7238,-122.47688,"San Francisco State University Observatory","<a href=http://www.physics.sfsu.edu/astronomy/observatory/>Observatory</a> of <a href=http://www.sfsu.edu>SFSU</a> at Thornton Hall.",2],
    ["PcfcCA",37.614,-122.486,"Pacifica","",4],
    ["SnMtCA",37.563,-122.324,"San Mateo","",2],
    ["SnPsqPCA",33.0985,-116.9874,"San Pasqual Battlefield State Historic Park","<a href=http://www.parks.ca.gov/?page_id=655>State park</a> and site of of monthly <a href=http://daphne.palomar.edu/mlane/EXTRACREDIT/SanPasqual2007Calendar.pdf>star parties</a>.",5],
    ["SntLzObCA",32.993,-117.151,"Santaluz Observatory","<a href=http://www.santaluzobservatory.com>Observatory</a> in Santaluz Club.",3],
    ["CstCg2CA",35.64965,-120.67204,"Cuesta College - North County Campus","A <a href=http://academic.cuesta.edu/norco/index.htm>campus</a> of <a href=http://www.cuesta.edu/>Cuesta College</a>. Site of <a href=http://www.ccastronomy.org/star_parties.htm>star parties</a> held by the <a href=http://www.ccastronomy.org>Central Coast Astronomical Society</a>.",5],
    ["BlkRkRSCA",36.0936,-118.2611,"Blackrock Ranger Station","",13],
    ["BrtIdOb2CA",37.11313,-121.70242,"BREIT IDEAS Observatory","A private  <a href=http://www.poyntsource.com/BREIT_IDEAS/index.htm>observatory</a> outside Morgan Hill.",5],
    ["CSMObCA",37.53694,-122.3375,"CSM Observatory","Observatory of the <a href=http://www.smccd.net/accounts/csmastronomy/>astronomy department</a> of <a href=http://collegeofsanmateo.edu/>College of San Mateo</a>.",3],
    ["LstVlyCA",37.11241,-119.32560,"Lost Valley Observatory","A private <a href=http://www.lostvalleyobservatory.com>observatory</a> between Yosemite and Kings Canyon in the Sierra Nevada Mountains.",9],
    ["CncrdOb",37.9409,-121.961,"Concord Observatory","A private observatory in Concord.",4],
    ["Sth4kObCA",36.4101,-118.8926,"South Fork Observatory","A private observatory near Three Rivers.",10],
    ["FlsmLkCA",38.74016,-121.13182,"Folsom Lake State Recration Area","<a href=>State recreation area<a> norteast of Sacramento. Chart also covers the towns of Roseville and Folsom.",4],
    ["LkAlmnrCA",40.24848,-121.14418,"Lake Almanor","",10],
    ["CPRCCOCA",38.72702,-120.86809,"Cameron Park Rotary Club Community Observatory","A community observatory built and operated by the <a href=http://www.cameronparkrotary.org/>Rotary Club of Cameron Park</a>, the <a href=http://www.edcoe.k12.ca.us/>El Dorado County Office of Education</a>, and <a href=http://www.flc.losrios.edu/>Folsom Lake College</a>. In El Dorado County.",5],
    ["BsknEnObCA",37.00035,-122.0628,"Baskin Engineering Observatory","An observatory of the <a href=http://www.ucsc.edu/public/>University of California, Santa Cruz</a>.",5],
    ["MrnVllyCA",33.938,-117.23,"Moreno Valley","",2],
    ["BgFlsCgCA",34.08194,-116.89333,"Big Falls Campground","A campground near Forest Falls.",6],
    ["HlWllCpCA",35.04333,-115.39583,"Hole-in-the-Wall Campground","<a href=http://www.socalcamping.com/000Mojave/holeinthewall.html>Campground</a> in the Mojave desert.",12],
    ["CwSddlCA",34.2291,-117.6698,"Cow Canyon Saddle","A spot in Cow Canyon, near Mt. Baldy, used as an observing and star party location by the <a href=http://pvaa.us/>Pomona Valley Amateur Astronomers</a>.",4],
    ["BdgPrLkObCA",38.256,-119.23,"Bridgeport Lake Private Observatory","A private observatory in Bridgeport Valley.",10],
    ["SdnSThCA",34.11111,-118.92666,"Sandstone Trailhead","Head of the <a href=http://www.localhikes.com/Hikes/MisheMokwa_4472.asp>Standstone Peak Trail</a>. Used by members of the <a href=http://www.sidewalkastronomers.com/>Los Angeles Sidewalk Astronomers<a/> among others.",5],
    ["Drt1CA",34.57777,-118.67166,"Templin Hwy","A dirt parking lot at Templin Highway and Ridge Route. Used by members of the <a href=http://www.sidewalkastronomers.com/>Los Angeles Sidewalk Astronomers<a/> among others.",6],
    ["MncCynObCA",34.05228,-118.49933,"Santa Monica Canyon Observatory","A private observatory.",1],
    ["MchlzObCA",39.07444,-120.94472,"Machholz Observatory","A private observatory near Colfax.",7],
    ["MmthObCA",37.649,-118.971,"Mammoth Observatory","A private observatory near Mammoth Lakes.",6],
    ["PrdsCA",39.76,-121.621,"Paradise","",7],
    ["OkLndCA",37.804,-122.27,"Oakland","",1],
    ["CACtyCA",35.126,-117.985,"California City","",7],
    ["WbbScObCA",34.12668,-117.74093,"Webb Schools Observatory","A observatory of <a href=http://www.webb.org/>The Webb Schools</a>.",2],
    ["YmdObCA",36.798,-119.299,"Yamada Observatory","A private observatory in Wonder Valley, east of Fresno.",9],
    ["GWPCA",38.87638,-123.27583,"Galbreath Wildlands Preserve","<a href=http://www.sonoma.edu/galbreath/>Wildlife preserve</a> of  <a href=http://www.sonoma.edu/galbreath/>Sonoma State University</a>.",12],
    ["MrVstCA",34.005,-118.43,"Mar Vista","",0],
    ["AbrnCA",38.897,-121.076,"Auburn","Forecast also covers the <a href=http://www.parks.ca.gov/?page_id=502>Auburn State Recreation Area</a>",5],
    ["OkHlsObCA",34.38166,-117.34222,"Oak Hills Observatory","A private <a href=http://www.pcplushobbies.com/Oak%20Hills%20Observatory/Toms.html>observatory</a> in Hesperia.",5],
    ["PnHdObCA",34.44725,-118.1985,"Pinhead Observatory","A private <a href=http://www.actonastro.com/obs.htm>observatory</a> in Acton.",5],
    ["McknyCObCA",38.23333,-120.5,"McKinney Creek Observatory","A private observatory.",10],
    ["HnslyLkCA",37.12222,-119.87611,"Hensley Lake","Regular observing site of the <a href=http://www.cvafresno.org>Central Valley Astronomers</a>.",9],
    ["CrtghRsvCA",37.07944,-118.96972,"Courtright Reservoir","Observing site used by the <a href=http://www.cvafresno.org>Central Valley Astronomers</a>",12],
    ["BgMdwCA",36.71,-118.865,"Big Meadow","Observing site used by the <a href=http://tulareastro.org/>Tulare Astronomical Association</a> and the <a href=http://www.cvafresno.org>Central Valley Astronomers</a>.",12],
    ["BlkMtnObCA",41.8998,-122.4808,"Black Mountain Observatory","A site of a future private observatory near Hornbrook.",12],
    ["BlRdgVcCA",38.38867,-122.09571,"Blue Ridge","The general area of Blue Ridge, in the Vaca Mountains.",6],
    ["OjaiCA",34.448,-119.242,"Ojai","",6],
    ["SntRsMtCA",33.5382,-116.4618,"Santa Rosa Mountain","Centered on the trail to the summit. Also close to <a href=http://www.hikercentral.com/campgrounds/115056.html>Santa Rosa Campground</a>.",7],
    ["JBObCA",32.9673,-117.0346,"Poinsettia Observatory","A private observatory in Poway.",3],
    ["LDSlvObCA",36.99516,-120.01016,"Lee DaSilva Observatory","A private observatory near Madera.",6],
    ["AftnCyCCA",35.1,-116.25,"Afton Canyon Campground","<a href=http://www.socalcamping.com/000Mojave/afton.html>campground</a> near Interstate 15 along the Mojave River between Barstow and Baker.",11],
    ["StryKngCA",39.66,-123.48,"Starry Kingdom Observatory","A private <a href=http://www.starrykingdom.com>observatory</a> in Laytonville.",11],
    ["BytObCA",37.2836,-119.63835,"Bayt Observatory","A private observatory near Coarsegold.",9],
    ["BtsnObCA",40.36833,-120.67805,"Bateson Observatory","A private <a href=http://www.flickr.com/photos/697650grr/?saved=1>observatory</a> near Susanville</a>.",9],
    ["KtnStCA",38.50611,-120.49916,"Keeton Observing Site","A private observing site also used by some members of the <a href=http://www.svas.org>Sacramento Valley Astronomical Society</a>",9],
    ["OPTCA",33.19819,-117.376,"OPT Parking Lot","Parking lot of a <a href=http://www.optcorp.com>telescope retailer</a> which is site of public observing. In Oceanside.",3],
    ["GrnAcObCA",37.8,-120.92,"Green Acres Observatory","A private observatory.",5],
    ["WlkrPsCmpCA",35.66411,-118.03758,"Walker Pass Campground","<a href=http://www.ca.blm.gov/bakersfield/walkerpasstrailhead.html>Campground</a> and <a href=http://www.philharrington.net/ds_ca.htm>dark-sky site</a>.",12],
    ["DlMrCA",32.959,-117.264,"Del Mar","",3],
    ["LckWdVlyCA",34.7281,-119.1629,"Lockwood Valley","",9],
    ["StTrsSpCA",37.23333,-121.7,"Santa Teresa Spring","",5],
    ["BwnCstObCA",35.32917,-120.74286,"Bowen Observatory","Observatory of <a href=http://www.cuesta.edu/>Cuesta College</a>.",6],
    ["29PlmsACA",34.13159,-115.94582,"Twentynine Palms Airport","An <a href=http://www.airnav.com/airport/KTNP>airport</a> near Twentynine Palms.",9],
    ["CdrGlnObCA",34.255,-117.17,"Cedar Glen Observatory","(A private <a href=http://www.thecgo.com/>observatory</a> near Cedar Glen.",5],
    ["ClPlyObCA",35.30066,-120.65866,"Cal Poly Observatory","<a href=http://www.calpoly.edu/~phys/observ.html>Observatory</a> of <a href=http://www.calpoly.edu>California Polytechnic State University</a>. Near San Luis Obispo.",5],
    ["MnrviaCA",34.14805,-118.00111,"Monrovia","Centered on Library Park, this chart marks the site of public observing held by the <a href=http://www.otastro.org/>Old Town Sidewalk Astronomers</a>.",1],
    ["OTPsdnCA",34.14583,-118.15222,"Old Town Pasadena","Centered Colorado Blvd, somewhere between Fair Oaks and Pasadena Ave, this charts marks the site of public observing held by the <a href=http://www.otastro.org/>Old Town Sidewalk Astronomers</a>.",1],
    ["NvdCtyCA",39.262,-121.015,"Nevada City","",6],
    ["MtnHghObCA",33.05361,-116.6025,"Mountain High Observatory","A private <a href=http://www.mountainhighbnb.com/observatory.htm>observatory</a> in Julian.",8],
    ["BlthCA",33.61,-114.596,"Blythe","Home of the <a href=http://nightsky.jpl.nasa.gov/club-view.cfm?Club_ID=1168>Colorado River Astronomy Club</a>.",5],
    ["TlgphCtyCA",37.934,-120.739,"Telegraph City","A site used by some members of the <a href=http://www.stocktonastro.org/>Stockton Astronomical Society</a>.",8],
    ["TylrObCA",38.971,-122.8209,"Taylor Observatory","A community <a href=http://www.taylorobservatory.org/>Observatory</a> in Kelseyville.",8],
    ["RbnsnCrkObCA",39.11851,-123.27286,"Robinson Creek Observatory","A private <a href=http://ben.davies.net/observatory.htm>observatory</a> in Robinson Creek,west of Ukiah.",9],
    ["LgnBchCA",33.542,-117.782,"Laguna Beach","",3],
    ["SnClntCA",33.427,-117.611,"San Clemente","",3],
    ["SeaRnhCA",38.715,-123.453,"Sea Ranch","A private ranch near Gualala.",11],
    ["ArryGndCA",35.11555,-120.57478,"Arroyo Grande","",5],
    ["SnClmtINCA",32.98333,-118.55055,"San Clemente Island (North)","Chart covers the north half of San Clamente Island.",10],
    ["GrvyRnOb",34.0528,-118.1139,"Garvey Ranch Observatory","<a href=http://laas.org/grpark.html>Observatory</a> in <a href=http://ci.monterey-park.ca.us/home/index.asp?page=829>Garvey Ranch Park</a> in the city of Monterey Park.) Operated by the <a href=http://www.laas.org/>Los Angeles Astronomical Society</a>.",0],
    ["HmObCA",38.56527,-122.6875,"Hume Observatory","Managed by the <a href=http://www.calacademy.org/>California Academy of Sciences</a> and home of GORT (Gamma-ray Optical Robotic Telescope) of the <a href=http://gtn.sonoma.edu/public/>GAST Telescope Network</a>. ",7],
    ["ShvrLk1CA",37.1289,-119.3019,"Shaver Lake","",9],
    ["StcktnCA",37.958,-121.29,"Stockton","Home of the <a href=http://www.stocktonastro.org/>Stockton Astronomical Society</a>.",2],
    ["AngwnCA",38.576,-122.449,"Angwin","",7],
    ["SntRsCA",38.441,-122.713,"Santa Rosa","",3],
    ["HrnSmtCA",35.4022,-115.7895,"Halloran Summit","",10],
    ["SimiVCA",34.269,-118.781,"Simi Valley","Home of the <a href=http://www.vcas.org/>Ventura County Astronomical Society</a>.",3],
    ["MsnTrlRPCA",32.8406,-117.0332,"Mission Trails Regional Park","Centered on <a href=http://www.mtrp.org/campground.asp>Kumeyaay Campground </a> in <a href=http://www.mtrp.org/>Mission Trails Regional Park</a>. Site of public star parties held by the <a ref=http://www.sdaa.org/index.cfm?fuseaction=events.list#satm>San Diego Astronomy Association</a>.",2],
    ["SnBrnCnMuCA",34.0674,-117.224,"San Bernardino County Museum","<a href=http://www.co.san-bernardino.ca.us/museum/>Museum</a> and <a href=http://www.sbvaa.org/frame.htm?main=info.html>meeting place, with public astronomy</a> of the <a href=http://www.sbvaa.org>San Bernardino Valley Amateur Astronomers</a>. In Redlands.",2],
    ["BkrsfldCA",35.373,-119.018,"Bakersfield","Home of the <a href=http://www.kernastro.org/>Kern Astronomical Society</a>.",2],
    ["YccVllyCA",34.114,-116.431,"Yucca Valley","Home of the <a href=http://www.andromedasociety.com/>Andromeda Society</a>.",6],
    ["SrrStrsObCA",38.81073,-119.77506,"Sierra Stars Observatory","A private observatory near Paynesville.",9],
    ["RckHllObCA",39.10222,-121.00888,"Rock Hill Observatory","A private observatory in Grass Valley.",7],
    ["TrrncCA",33.836,-118.34,"Torrance","",1],
    ["VistaCA",33.207,-117.257,"Vista","",2],
    ["SlkvthObCA",33.0797,-116.773,"Selkovitch's Observatory","",7],
    ["DVHSCA",38.005,-121.805,"DVHS Espace Academy","<a href=http://www.espaceacademy.com/>ESpace Academy</a>, part of <a href=http://www.antioch.k12.ca.us/dvhs/index.htm>Deer Valley High School</a> In Antioch.",3],
    ["PthCrkObCA",38.70212,-122.38652,"Putah Creek Observatory","Future site of a private observatory in Pope Valley.",9],
    ["FcklHllObCA",40.80246,-123.9862,"Fickle Hill Observatory","<a href=http://www.humboldt.edu/~phyx/observatory.html>Observatory</a> of <a href=http://www.humboldt.edu/~phyx/observatory.html>Humboldt State University</a>. Near Arcata.",10],
    ["OwlCnynCCA",35.0157,-117.0195,"Owl Canyon Campground","Near Barstow.",9],
    ["SMCObCA",37.83936,-122.10138,"Saint Mary's College Observatory","AKA SMC Campus Observatory. Observatory of <a href=http://physics.stmarys-ca.edu/>Saint Mary's College </a>.",3],
    ["SlvrwdLkCA",34.28233,-117.34966,"Silverwood Lake","Actually near the south-east shore of the lake. Forecast also covers the <a href=http://www.parks.ca.gov/?page_id=650>Silverwood lake State Recreation Area</a>.",5],
    ["Etna1CA",41.457,-122.894,"Etna","",10],
    ["ErksnObWrnrCA",33.39103,-116.6596,"Erickson Observatory Site","Future site of Erickson Observatory (private). In Warner Springs.",8],
    ["PenrynCA",38.852,-121.168,"Penryn","",5],
    ["VallejObCA",38.12213,-122.21094,"Vallejo Observatory","A private observatory site close to Vallejo.",3],
    ["MdstoCA",37.639,-120.99,"Modesto","Home of the of Stanislaus Amateur Astronomers of Modesto Jr. College.",2],
    ["GrsswdObCA",34.01222,-118.80416,"Grasswood Observatory","A private observatory near Malibu.",5],
    ["VcvllCA",38.357,-121.987,"Vacaville","",3],
    ["MndtWLCA",36.69704,-120.26884,"Mendota Wildlife Area","A <a href=http://www.dfg.ca.gov/lands/newsites/wa/region4/mendota.html>wildlife area</a> a few files north-east of Tranquillity.",8],
    ["DsrtCntrCA",33.713,-115.401,"Desert Center","A spot on Hwy 177 North of Interstate 10. On the west side of Palen Pass.",10],
    ["LkSMrgrtCA",35.32055,-120.49694,"Santa Margarita Lake","A site in <a href=http://www.slocountyparks.com/activities/santa_margarita.htm>Santa Margarita Lake Regional Park</a> used by the <a href=http://www.ccastronomy.org/star_parties.htm>Central Coast Astronomcal Society</a>.",9],
    ["CrrAltCMPCA",35.425,-120.73833,"Cerro Alto Campground","<a href=http://www.parksman.com/cerro.html>Campground</a> 8 miles from Morro Bay",8],
    ["AtscdrCA",35.489,-120.67,"Atascadero","",5],
    ["FthllCllgObCA",37.363,-122.13081,"Foothill Observatory","<a href=http://www.foothill.fhda.edu/ast/fhobs.htm>Observatory</a> of <a href=http://www.foothill.fhda.edu/index.shtml>Foothill College</a>. Used by the <a href=http://www.foothill.edu/ast/pas.htm>Peninsula Astronomical Society</a> for public programs. In Los Altos Hills.",3],
    ["CbrllClgObCA",36.993,-121.92416,"Cabrillo College Observatory","<a href=http://www.cabrillo.cc.ca.us/~rnolthenius/observatory/observatory.htm>Observatory</a> of <a href=http://www.cabrillo.edu/index.html>Cabrillo College</a>.",5],
    ["WstSwnyRObCA",37.59222,-122.46166,"West Sweeney Ridge Observatory","A private observatory near Pacifica.",4],
    ["IndnVllyObCA",39.08339,-122.78512,"Indian Valley Observatory","A private observatory near Lucerne.",9],
    ["MaisObCA",33.2656,-117.0023,"Mais Observatory","A private spectroscopic <a href=http://mais-ccd-spectroscopy.com/observatory_article.htm>observatory</a> in Valley Center.",5],
    ["KnndyMdwsCA",36.0525,-118.1299,"Kennedy Meadows","In <a href=http://www.fs.fed.us/r5/sequoia/>Sequoia National Forest</a>.",13],
    ["ClrLkeCA",38.995,-122.733,"Clear Lake","Covers the Clear Lake area inclunding <a href=http://www.sonic.net/kflood/bike/boggs/boggs.html>Boggs Mountain State Forest</a>. ",8],
    ["ComaViaObCA",36.091,-118.8323,"Coma Via Observatory","An <a href=http://www.astrospringville.org/ComaViaObservatory/index.html>observatory</a> near Springville.",9],
    ["ChchptRSCA",34.8061,-119.0114,"Chuchupate Ranger Station","Members of the <a href=http://www.kernastro.org/>Kern Astronomical Society</a> observe nearby.",8],
    ["ElCjnCA",32.795,-116.962,"El Cajon","",2],
    ["RdRckCySPCA",35.36777,-117.98888,"Red Rock Canyon State Park","A <a href=http://www.calparksmojave.com/redrocks/>state park</a> used by local clubs for star parties.",11],
    ["RckMtnObCA",33.4375,-117.24166,"Rock Mountain Observatory","A private observatory near Fallbrook.",5],
    ["HghSrrPkCA",38.07638,-120.14722,"High Sierra Park","In the Stanislaus National Forest  near Mi-Wuk Village.",9],
    ["ElCntrCA",32.792,-115.562,"El Centro","",3],
    ["PrtrvllCA",36.065,-119.016,"Porterville","",4],
    ["AVAC1CA",34.75128,-118.51095,"AVAC Kings Canyon Site","Observing <a href=http://www.avastronomyclub.org/sites/avac.htm>site</a> of <a href=http://www.avastronomyclub.org/>The Antelope Valley Astronomy Club</a>.",7],
    ["CrstvwCA",37.765,-118.98083,"Crestview","A hill site near Crestview, a few miles north-west of Mammoth Lakes in <a href=http://www.r5.fs.fed.us/inyo/>Inyo National Forest</a>.",12],
    ["IHOPCA",38.79222,-120.39583,"Ice House Observation Plateau","IHOP is an observing site use by members of <a href=http://tac-sac.org/>TAC-SAC</a>.",10],
    ["RnchDlSlObCA",38.72138,-120.635,"Rancho Del Sol Observatory","A private <a href=http://www.rdelsol.com/>observatory</a> near Camino.",8],
    ["RamnObCA",33.01305,-116.92527,"Ramona Observatory","A private observatory near Ramona.",5],
    ["MdcnoCA",39.314,-123.797,"Mendocino","",10],
    ["LncstrCA",34.698,-118.136,"Lancaster","",2],
    ["ElkGrvCA",38.409,-121.371,"Elk Grove","Used for public star parties by the <a href=http://www.svas.org/>Sacramento Valley Astronomical Association</a> (SVAS).",3],
    ["SrtgaCA",37.264,-122.02,"Saratoga","",3],
    ["MSASOb1CA",34.23083,-117.20888,"Robert Brownlee Observatory","An <a href=http://www.mountain-skies.org/insideob.htm>observatory</a> of the <a href=http://www.mountain-skies.org/>Mountain Skies Astronomical Society</a>. At <a href=http://www.mountain-skies.org/astro-village.html>MSAS Astronomy Village</a> near Lake Arrowhead.",5],
    ["OkrdgObCA",37.2036,-122.0539,"Oak Ridge Observatory","Observatory of the <a href=http://www.foothill.fhda.edu/ast/pas.htm>Peninsula Astronomical Society</a>, located in the Santa Cruz Mountains.",5],
    ["OnyzCA",35.74881,-118.11271,"Canebrake","7 miles east of Onyx. In the Kern valley.",12],
    ["RdrckInyCA",35.45,-117.9583,"Redrock Inyokern Road","Used by the <a href=http://www.sbastro.net/>South Bay Astronomical Society</a>.",11],
    ["LwsCntrCA",34.5,-117.28333,"Luz Observatory","<a href=http://www.hidasonline.com/pdf/Calendar03.pdf>Observatory</a> in the  <a href=http://www.lewiscenter.org/>Lewis Center for Educational Research</a>. Base of the <a href=http://www.hidasonline.com/>HiDAS</a>. In Apple Valley.",3],
    ["IdyllwildCA",33.74,-116.718,"Idyllwild","",6],
    ["AngsOksCA",34.146,-116.982,"Angelus Oaks Heliport","",6],
    ["TmclCA",33.494,-117.148,"Temecula","Home of the <a href=http://tva.mrh.org/>The Temecula Valley Astronomers</a>.",3],
    ["CrsgldCA",37.21290,-119.73072,"Coarsegold","",8],
    ["AlpnCA",32.84638,-116.75944,"Alpine","",5],
    ["EwellObCA",37.51525,-122.29513,"Ewell Observatory","",3],
    ["HddnVllyObCA",36.988,-121.956,"Hidden Valley Observatory","A private <a href=http://www.galaxyimages.com/astrophotographybystevemandel.html>observatory</a> near Soquel.",4],
    ["GrlyHllObCA",37.73548,-120.18418,"Greeley Hill Observatory","A private observatory near Coulterville.",11],
    ["FrwyOBCA",33.2626,-117.017,"Far Away Observatory","A private observatory in Valley Center.",5],
    ["LwrncHSCA",37.87854,-122.24150,"Lawrence Hall of Science","A <a href=http://lawrencehallofscience.org/>public and school science center</a> of the University of California at Berkeley.",2],
    ["LkElsnrCA",33.668,-117.326,"Lake Elsinore","",4],
    ["VndnbrgVCA",34.715,-120.471,"Vandenberg Village","",6],
    ["DBMllknPlCA",34.11,-117.59,"Daniel B. Milliken Planetarium","<a href=http://www.chaffey.edu/planet/>Planetarium</a> at <a href=http://www.chaffey.edu>Chaffey College<a> in Rancho Cucamonga.",1],
    ["EAFB",34.9528,-117.8977,"EAFB","<a href=http://www.edwards.af.mil/>Edwards Air Force Base</a> is an alternate shuttle landing site. Also home of the <a href=http://www.dfrc.nasa.gov/>Dryden Flight Research Center</a>.",5],
    ["ArthrPObCA",36.16666,-119.36666,"Arthur Purcell Observatory","Observatory of the <a href=http://home.earthlink.net/~sixlights/index.htm>Tulare Astronomical Association</a>.",5],
    ["TrcyAprtCA",37.6879,-121.4337,"Tracy Airport","",4],
    ["AtmtIntObCA",34.506,-117.909,"Automata Internet Observatory","In Pearblossom.",6],
    ["PnchPss",36.628,-121.013,"Panoche Pass","",11],
    ["PnnHllsCA",34.44293,-117.64026,"Pinon Hills","Near Wrightwood in the San Gabriel Mountains.",6],
    ["CrlsLmmObCA",33.77138,-118.39527,"Carlos Lemmi Observatory","A private <a href=http://members.aol.com/wb6mcw/main.html>observatory</a> near Rancho Palos Verdes. MPC G71.",2],
    ["PlttsnCA",37.56694,-120.13138,"Plettstone","Home of the <a href=http://www.plettstone.com/observatory.html>Dale Jay Steed Observatory</a>, a private observatory. A site used by members of <a href=http://www.observers.org/>TAC</a> and the <a href=http://www.sjaa.net/>SJAA</a>. Near Mariposa.",11],
    ["BanningCA",33.926,-116.876,"Banning","",5],
    ["EglRdgObCA",34.17277,-118.94583,"Eagle Ridge Observatory","A private observatory near Newbury Park.",3],
    ["StClaritaCA",34.392,-118.52,"Santa Clarita","",2],
    ["StPaulaCA",34.32611,-119.0625,"Santa Paula","A site used by the <a href=http://www.cometman.net/sco>Southern California Observers</a>.",5],
    ["VsqzRcksCA",34.48509,-118.31701,"Vasquez Rocks","A <a href=http://parks.co.la.ca.us/vasquez_narea.html>Natural Area Park</a> used as a star party site by <a href=http://www.lgscv.org>The Local Group</a>.",5],
    ["SddlBckBtCA",34.67763,-117.805,"Saddleback Butte","A <a href=http://www.calparksmojave.com/saddleback/>State Park</a> used as a star party site by  <a href=http://www.avastronomyclub.org/>The Antelope Valley Astronomy Club</a>.",7],
    ["SnrsObCA",33.089,-117.112,"Sonrisa Observatory","A private observatory near Escondido.",3],
    ["OccdntlObCA",38.42144,-122.92022,"Occidental Observatory","Near Occidental.",7],
    ["NapaCA",38.297,-122.284,"Napa","",4],
    ["CytLkCPCA",37.119,-121.548,"Coyote Lake","A <a href=http://www.parkhere.org/prkpages/coylake.htm>county park</a> used by members of the <a href=http://www.sjaa.net>SJAA</a> and <a href=http://www.observers.org>TAC</a>.Near Gilroy.",6],
    ["SwmllTrlCA",33.58,-116.44972,"Sawmill Trailhead","A site used by the <a href=http://www.astrorx.org/>Astronomical Society of the Desert</a>. Near Pinyon Flats ",7],
    ["PnnVlyCA",39.18888,-121.18222,"Penn Valley","",7],
    ["NvjFltsCA",35.40083,-120.28083,"Navajo Flats","A <a href=http://www.ccastronomy.org/navajo_flats.htm>site</a> used by the <a href=http://www.ccastronomy.org/>Central Coast Astronomical Society</a>",11],
    ["1KPalmsCA",33.82,-116.389,"Thousand Palms","Star Party Site for the <a href=http://www.astrorx.org/>Astronomical Society of the Desert</a>.",3],
    ["GlcrPtYPCA",37.72756,-119.57420,"Glacier Point","A <a href=http://www.americansouthwest.net/california/yosemite/glacier_point.html>site</a> of <a href=http://www.sfaa-astronomy.org/lib_code/frame_wrapper.php?eventwrapper:766>public star parties</a>. In <a href=http://www.nps.gov/yose/>Yosemite National Park</a>.",12],
    ["LgNglCA",33.523,-117.707,"Laguna Niguel","",2],
    ["CoronaCA",33.875,-117.566,"Corona","",2],
    ["FresnoCA",36.748,-119.771,"Fresno","Home of the <a href=http://www.cvafresno.org/>Central Valley Astronomers</a>.",2],
    ["ScrmntoCA",38.582,-121.493,"Sacramento","Home of the <a href=http://www.svas.org/>Sacrameto Valley Astronomical Association</a> and <a href=http://groups.yahoo.com/group/TAC-SAC>TAC-SAC</a>.",2],
    ["CimaCA",35.23333,-115.5,"Cima","A <a href=http://www.astronomynv.org/vegas/Observation%20Sites/cima.htm>site</a> used by the  <a href=http://www.astronomynv.org/vegas/>Astronomical Society of Nevada, Las Vegas</a> and the <a href=http://www.astronomylv.com/index.php>Astronomical Group of Las Vegas</a>. In the <a href=http://www.nps.gov/moja/>Mojave National Preserve</a>.",12],
    ["CpprMntnObCA",34.135,-116.312,"Copper Mountain Observatory","Near the town of Joshua Tree which is near the north east corner of Joshua Tree National Park.",7],
    ["BigBearCA",34.2753,-116.8054,"Big Bear City","In the San Bernardino Mountains",7],
    ["SchrdrPlCA",40.58038,-122.39982,"Schreder Planetarium","A <a href=http://www.schrederplanetarium.com/>planetarium</a> with public observing sessions. In Redding.",4],
    ["ChbtSPCCA",37.81913,-122.18186,"Chabot Space and Science Center","A <a href=http://www.ChabotSpace.org>science center</a> home to the <a href=http://www.EastbayAstro.org>Eastbay Astronomical Society</a>. In Oakland.",2],
    ["MtTamaCA",37.91083,-122.61277,"Mount Tamalpais State Park","Centered on Rock Springs parking area, of <a href=http://www.parks.ca.gov/?page_id=471>Mount Tamalpais State Park</a>, a site used by the <a href=http://www.sfaa-astronomy.org/>San Francisco Amateur Astronomers</a>. Also site of <a href=http://www.mttam.net/astronomy/schedule.html>astronomy programs</a> organized by the <a hef=http://www.mttam.net>Mt. Tamalpais Interpretive Association</a> (MTIA).",5],
    ["SanRafaelCA",37.974,-122.53,"San Rafael","A site used by the used by the <a href=http://www.sfsidewalkastronomers.org/>Marin Observers</a>.",3],
    ["RdndBchCA",33.868,-118.3905,"Redondo Beach","In the general area of the <a href=http://www.sbastro.net/>South Bay Astronomical Society</a>.",1],
    ["FiguerPCA",34.7438,-119.985,"Figueroa Lookout","A <a href=http://www.r5.fs.fed.us/lospadres/about_us/photo_gallery/santa_lucia/day_use/figueroa_lookout/figlop1.html>picnic area</a> in <a href=http://www.r5.fs.fed.us/lospadres/index.html>Los Padres National Forest</a>.",10],
    ["FossilFCA",35.97333,-117.91333,"Fossil Falls","In Owens valley.",12],
    ["GrandVCA",37.3333,-118.1889,"Grandview Campground","A <a href=http://www.philharrington.net/Ds_ca.htm#pine>dark sky</a> campground. In the White-Inyo Mountains in Big Pine.",13],
    ["CnwySmtCA",38.0875,-119.1808,"Conway Summit","A <a href=http://www.philharrington.net/Ds_ca.htm#LV>dark site</a> 12 miles north of Lee Vinning in Mono County.",13],
    ["LandersCA",34.29108,-116.38353,"Landers","Dark-sky site for the <a href=http://www.rivastro.org/>Riverside Astronomical Society</a>.",8],
    ["SonomaStCA",38.33666,-122.66055,"Sonoma State University Observatory","<a href=http://www.phys-astro.sonoma.edu/observatory/>observatory</a> in Sonoma State University. Near Rohnert Park and Cotati",5],
    ["MorgHCA",37.131,-121.653,"Morgan Hill","",4],
    ["FountValCA",33.69916,-117.83993,"Fountain Valley","Near Santa Ana.",1],
    ["MartisCrCA",39.32111,-120.12277,"Martis Creek Campground","A site used by the <a href=http://www.astronomynv.org/>Astronomical Society of Nevada</a>.",7],
    ["MesquiteSpCA",36.9624,-117.3677,"Mesquite Springs","In Death Valley. A site used by the <a href=http://www.astronomynv.org/vegas>Astronomical Society of Nevada, Las Vegas</a> and the <a href=http://www.astronomylv.com/index.php>Astronomical Group of Las Vegas</a>.",13],
    ["ChicoObCA",39.78611,-121.78555,"Chico Community Observatory","A community <a href=http://www.chicoobservatory.com/>observatory</a> in Upper Bidwell Park.",6],
    ["PaumaVyCA",33.303,-116.981,"Pauma Valley","Site of The Kathryn Hood Observatory.",6],
    ["LongBchCA",33.767,-118.188,"Long Beach","",0],
    ["BoonyDoonCA",37.0704,-122.1252,"Bonny Doon Airfield","A <a href=http://astronomy.santa-cruz.ca.us/bonnydoon>site</a> used by the <a href=http://astronomy.santa-cruz.ca.us/index.html>Santa Cruz Astronomy Club</a>.",6],
    ["FurnCrkCA",36.45,-116.85,"Furnace Creek","A site used by the <a href=http://www.astronomynv.org/vegas>Astronomical Society of Nevada, Las Vegas</a>, the <a href=http://www.lvastronomy.com/>Las Vegas Astronomical Society</a> and the <a href=http://www.astronomylv.com/index.php>Astronomical Group of Las Vegas</a>. Near Death Valley.",11],
    ["TeutPeakCA",35.31666,-115.55,"Teutonia Peak","A site used by the <a href=http://www.astronomynv.org/vegas>Astronomical Society of Nevada, Las Vegas</a>, the <a href=http://www.lvastronomy.com/>Las Vegas Astronomical Society</a> and the <a href=http://www.astronomylv.com/index.php>Astronomical Group of Las Vegas</a>.",11],
    ["ForesthCA",39.0191,-120.8288,"Foresthill","",8],
    ["CottCampCA",33.744,-115.811,"Cottonwood Spring Campground","A campground at <a href=http://www.joshua.tree.national-park.com/>Joshua Tree National Park</a>.",10],
    ["W6WLRCA",34.56972,-116.77194,"Camp Rock Road","10 miles north east of Lucerne Valley.",9],
    ["SaBarbCA",34.45,-119.77,"Santa Barbara","Home of <a href=http://www.sbau.org/>The Astronomical Unit</a> club.",4],
    ["RidgecrestCA",35.623,-117.67,"Ridgecrest","",5],
    ["LkShastinaCA",41.526,-122.3725,"Lake Shastina","About 17 miles north of Mt. Shasta.",10],
    ["WiltonCA",38.38633,-121.25983,"Wilton","",5],
    ["AnaheimCA",33.835,-117.914,"Anaheim","",0],
    ["RobFerObCA",38.4385,-122.5078,"Robert Ferguson Observatory","<a href=http://www.rfo.org/>Observatory</a> in Sugar Loaf Ridge State Park near Kenwood.",7],
    ["MtDiabloCA",37.8816,-121.913,"Mount Diablo","Home of the <a href=http://www.mdas.net/>Mt. Diablo Astronomical Society</a>.",4],
    ["MtHamCA",37.34333,-121.63472,"Mount Hamilton","Home of the <a href=http://www.ucolick.org/>Lick Observatory</a>.",6],
    ["SRdgOCA",34.29861,-117.99583,"Stony Ridge Observatory","An <a href=http://stony-ridge.org/index.html>observatory</a> in the Angeles National Forest",4],
    ["PedlarCA",38.5776,-120.26363,"Peddler Hill","A site used by the <a href=http://www.stocktonastro.org/>Stockton Astronomical Society</a>.",11],
    ["MonitorCA",38.76888,-119.66166,"Monitor Pass","",10],
    ["BodieCA",38.22583,-119.03831,"Bodie","",13],
    ["EspartoCA",38.692,-122.016,"Esparto","Site used by the Davis Astronomers.",7],
    ["BlueCanyonCA",39.257,-120.71,"Blue Canyon","Airport site used by the <a href=http://www.svas.org/>Sacramento Valley Astronomical Society</a> and members of <a href=http://tac-sac.org/>TAC-SAC</a>.",9],
    ["JumboRocksCA",33.99236,-116.06878,"Jumbo Rocks","A campground in Joshua Tree National Park.",9],
    ["GriffObsCA",34.113,-118.30152,"Griffith Observatory","A professional <a href=http://www.griffithobs.org/>observatory</a> with public star parties",0],
    ["SanFranCA",37.775,-122.418,"San Francisco","Home of the <a href=http://www.sfsidewalkastronomers.org/>San Francisco Sidewalk Astronomers</a> and the <a href=http://www.sfaa-astronomy.org/>San Francisco Amateur Astronomers</a>.",1],
    ["SanJoseCA",37.339,-121.894,"San Jose","Home of the <a href=http://www.sjaa.net/>San Jose Astronomical Association</a>.",1],
    ["SanDiego",32.715,-117.156,"San Diego","Home of the <a href=http://www.sdaa.org/>San Diego Astronomy Association</a>.",1],
    ["LAXCA",34.052,-118.243,"Los Angeles","Home of the <a href=http://www.laas.org/>Los Angeles Astronomical Society</a> and  the <a href=http://www.sidewalkastronomers.com/>Los Angeles Sidewalk Astronomers</a>.",0],
    ["LBVCA",33.02547,-116.3869,"Little Blair Valley","",10],
    ["MtLagOBCA",32.83944,-116.42555,"Mount Laguna Observatory","<a href=http://mintaka.sdsu.edu/index.html>link</a>.",9],
    ["PalomarOb",33.35626,-116.8648,"Palomar Observatory","<a http://www.astro.caltech.edu/palomar/homepage.html>Observatory</a>, with <a href=http://www.astro.caltech.edu/palomar/community/friends/outreachcenter.html>outreach center</a> of <a href=http://www.caltech.edu/>Caltech</a>. Home of the 200 inch <a href=http://www.astro.caltech.edu/palomar/about/telescopes/hale.html>Hale Telescope</a>",7],
    ["MtWilsonOBCA",34.22574,-118.05712,"Mount Wilson Observatory","<a href=http://www.mtwilson.edu>link</a>",3],
    ["RTMC",34.23055,-116.75416,"RTMC","<a href=http://www.rtmcastronomyexpo.org/>Riverside Telescope Makers Conference</a>. A starparty and swaptable feeding frenzy held at Camp Oaks.",8],
    ["PachecoCA",37.06222,-121.21638,"Pacheco State Park","A <a href=http://cal-parks.ca.gov/default.asp?page_id=560>state park</a> used as a <a href=http://www.darkhorizons.org/sites/pachecodetails.htm>dark sky site</a>.",9],
    ["DelValleCA",37.59833,-121.69,"Del Valle","Site <a href=http://www.darkhorizons.org/site/delvalledetails.htm>details</a>.",6],
    ["ChewsCA",36.30583,-121.56583,"MIRA Chews Ridge Observatory","<a href=http://www.mira.org/>Observatory</a> of the Monterey Institute for Research in Astronomy.",11],
    ["TulaOBCA",36.42638,-121.66583,"Tularcitos Observatory","A site used by the <a href=http://www.mira.org/ascc/index.htm>Mira Observers Group</a>",9],
    ["StanfordCA",37.41936,-122.1818,"Stanford","Centers on the <a href=https://physics.stanford.edu/student-observatory>Student Observatory</a> of <a href=http://www.stanford.edu/>Stanford University</a>. Home of the <a href=http://orion.stanford.edu/>Stanford Astronomical Society</a>.",3],
    ["Lassen_National_Park",40.51583,-121.46388,"Lassen National Park","Two <a href=http://www.observers.org/lassen2001.html>sites</a>  used by <a href=http://observers.org>TAC</a>: Devastated Area and Bumpass Hell.   No, really. I'm not making this up.  ",13],
    ["FiddletownCA",38.49166,-120.66333,"Fiddletown","A site about 6 miles east of Fiddletown proper.",9],
    ["HalfMoonCA",37.4928,-122.4544,"Half Moon Bay","",5],
    ["SonomaCA",38.72,-123.05638,"Lake Sonoma","A <a href=http://observers.org/sites/lake.sonoma.html>site</a> used by <a href=http://observers.org>TAC</a>",10],
    ["Lake_San_Antonio",35.81666,-120.95,"Lake San Antonio","A <a href=http://www-space.arc.nasa.gov/~astrochm/Lake%20San%20Antonio/Lake_San_Antonio.html>site</a> used by <a href=http://www.sjaa.net>SJAA</a> and <a href=http://observers.org>TAC</a>",11],
    ["Dino_CA",37.065,-121.17027,"Dinosaur Point","A <a href=http://www.darkhorizons.org/site/dinopoint_details.htm>site</a> used by <a href=http://www.sjaa.net>SJAA</a> and <a href=http://observers.org>TAC</a>",9],
    ["HenryCoe_CA",37.1875,-121.55027,"Henry Coe State Park","A <a href=http://www.sjaa.net/coe.html>site</a> used by <a href=http://www.sjaa.net>SJAA</a> and <a href=http://observers.org>TAC</a>",7],
    ["Fremont_CA",36.75865,-121.5042,"Fremont Peak","A <a href=http://www.fpoa.net/>site</a> used by <a href=http://www.sjaa.net>SJAA</a> and <a href=http://observers.org>TAC</a>. Home of the <a href=http://www.fpoa.net/>Fremont Peak Observatory</a>. In <a href=http://www.parks.ca.gov/?page_id=564>Fremont Peak State Park</a>.",7],
    ["Montebello_CA",37.32555,-122.17888,"Montebello","Montebello Open Space Preserve is a <a href=http://observers.org/sites/montebello.html>site</a> used by <a href=http://observers.org>TAC</a>",4],
    ["MtPinos",34.8132,-119.1265,"Mount Pinos","A popular observing <a href=http://www.astro-tom.com/avac/observing_sites/mount_pinos.htm>site</a> in <a href=http://www.fs.fed.us/r5/lospadres/index.html>Los Padres National Forest</a>",9],
    ["RoseValleyCA",34.53209,-119.18241,"Rose Valley Campground","A <a href=http://www.fs.fed.us/r5/lospadres/recreation/camping/ord/index.shtml#rose>campground</a> in <a href=http://www.r5.fs.fed.us/lospadres/index.html>Los Padres National Forest</a>.",8],
    ["TierradelSolCA",32.61277,-116.33194,"Tierra del Sol","<a href=http://www.sdaa.org/index.cfm?fuseaction=tds.info>Site</a> used by <a href=http://www.sdaa.org/>San Diego Astronomy Association</A>",8]];

function getClosestStation (lat, lng) {
  var closestStation = '',
      diff = 1000000;

  $.each(charts, function(index, chart) {
    var chartLat = chart[1],
        chartLng = chart[2];

    var chartDiff = Math.abs(chartLat - lat) + Math.abs(chartLng - lng);

    if (chartDiff < diff) {
      diff = chartDiff;
      closestStation = chart[0]
    }
  });

  return closestStation;
}

function appendCskChart(station) {
  var domain = 'http://www.cleardarksky.com/c/',
      anchorAction = station + 'key.html?1',
      anchorUri = domain + anchorAction,
      imgAction = station + 'cs0.gif?1',
      imgUri = domain + imgAction;

  $('a#cskLink').attr('href', anchorUri);
  $('img#cskChart').attr('src', imgUri);
}

function HomeControl(controlDiv, map) {
  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  //  controlDiv.style.padding = '5px';
  // // Set CSS for the control border
  // var controlUI = document.createElement('div');
  // controlUI.style.backgroundColor = 'white';
  // controlUI.style.borderStyle = 'solid';
  // controlUI.style.borderWidth = '2px';
  // controlUI.style.cursor = 'pointer';
  // controlUI.style.textAlign = 'center';
  // controlUI.title = 'Click for more Information';
  // controlDiv.appendChild(controlUI);
  // // Set CSS for the control interior
  // var controlText = document.createElement('div');
  // controlText.style.fontFamily = 'Arial,sans-serif';
  // controlText.style.fontSize = '14px';
  // controlText.style.color = 'blue';
  // controlText.style.paddingLeft = '4px';
  // controlText.style.paddingRight = '4px';
  // controlText.innerHTML = '<b>More Information</b>';
  // controlUI.appendChild(controlText);
  // Setup the click event listeners
  // google.maps.event.addDomListener(controlUI, 'click', function() {
  //   var url = "http://djlorenz.github.io/astronomy/lp2006/";
  //   window.open(url);
  // });
}

lat_selected = 0
long_selected = 0

function initialize() {
    var mapOptions = {
      zoom: 3,
      maxZoom: 17,
      center: new google.maps.LatLng(5, 0),
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //On mouse click:
    google.maps.event.addListener(map, 'click', function(event) {
        //Get lat/long at point
        lat_selected = event.latLng.lat()
        long_selected = event.latLng.lng()

        console.log("LAT:"+lat_selected);
        console.log("LNG:"+long_selected);

        $("#coordinate").val(event.latLng.lat() + ", " + event.latLng.lng());
        $("#coordinate").select();

        darksky_url = "http://stargazr.us-west-2.elasticbeanstalk.com/weather?lat="+lat_selected+"&lng="+long_selected;

    });

    //on button press to get conditions at a site
    $( "#get-conditions-here" ).click(function() {
        $.get(darksky_url, function(weatherdata) {

            //set vars for weather data from request
            var precipProbability = weatherdata.currently.precipProbability
            var humidity = weatherdata.currently.humidity
            var visibility = weatherdata.currently.visibility
            var cloudCover = weatherdata.currently.cloudCover
            var moonPhase = weatherdata.daily.data[0].moonPhase //0 tells to grab todays phase. allows 0-7

            //Populate HTML fields
            $("#cloudCover").html( 100*Math.round(cloudCover) + "%");
            $("#visibility").html(visibility);
            $("#humidity").html(100*Math.round(humidity) + "%");
            $("#precipProbability").html(100*Math.round(precipProbability) + "%");
            $("#moonPhase").html(100*Math.round(moonPhase) + "% Full")

            //Rate quality based on each parameter
            precip_quality = (1-Math.sqrt(precipProbability))
            humid_quality = (Math.pow(-humidity+1,(1/3)))
            cloud_quality = (1-Math.sqrt(cloudCover))

            console.log("precip:"+precip_quality+"\n",
                        "humid:"+humid_quality+"\n",
                        "cloud:"+cloud_quality+"\n");

            //Find overall site quality
            site_quality = (precip_quality * humid_quality * cloud_quality)*100 // to or not to include * (1-moonPhase)
            console.log("qual", site_quality);
            //Determine Site quality description
            site_quality_discript = ""
            if (site_quality > 90){
              site_quality_discript = "Excellent"
            }
            else if (site_quality > 80) {
              site_quality_discript = "Good"
            }
            else if (site_quality > 50) {
              site_quality_discript = "Fair"
            }
            else if (site_quality > 30) {
              site_quality_discript = "Poor"
            }
            else {
              site_quality_discript = "Terrible"
            }
            //Populate HTML
            $("#site-rating").html(Math.round(site_quality) + " - " + site_quality_discript );
        })

        //Driving Distance/Time request
        dist_url = "http://stargazr.us-west-2.elasticbeanstalk.com/distance"
        $.get(dist_url,
          {
            units: "metric",
            origins: "37.790319,-122.40014",
            destinations: lat_selected+","+long_selected
          },
          function(dist_data){

            try {
              //Assign vars for time and Distance
              drive_time = dist_data.rows[0].elements[0].duration.text;
              drive_dist = dist_data.rows[0].elements[0].distance.text;
              //populate with approprite time and distance
              $("#dtime").html(drive_time);
              $("#ddist").html(drive_dist);
            }
            catch(err) {
              //if no route foundm, give N/A message
              $("#dtime").html("N/A");
              $("#ddist").html("N/A");
            }
          }
        )

        appendCskChart(getClosestStation(lat_selected, long_selected));
    });


//Begin djlorenz's code
  var bounds = {
     0: [[0,  0], [0, 0]],
     1: [[0,  1], [0, 1]],
     2: [[0,  3], [0, 2]],
     3: [[0,  7], [1, 5]],
     4: [[0, 15], [2, 11]],
     5: [[0, 31], [5, 23]],
     6: [[0, 63], [11,47]]
  };
  var zoomLevel = 1;
  var first = 1;
  var overlayfull = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 2;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(1024, 1024)
  });
  var overlay9 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 3;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(2048, 2048)
  });
  var overlay10 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 4;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(4096, 4096)
  });
  var overlay11 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 5;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(8192, 8192)
  });
  var overlay12 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 6;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(16384, 16384)
  });
  var overlay13 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 7;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(32768, 32768)
  });
  var overlay14 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 8;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(65536, 65536)
  });
  var overlay15 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 9;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(131072, 131072)
  });
  var overlay16 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 10;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(262144, 262144)
  });
  var overlay17 = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
       var zoom2 = zoom - 11;
       var x = coord.x % Math.pow(2,zoom2);
       if( x < 0 )
       {
          x = x + Math.pow(2,zoom2);
       }
      if (zoom2 < 0 ||
          bounds[zoom2][0][0] > x || x > bounds[zoom2][0][1] ||
          bounds[zoom2][1][0] > coord.y || coord.y > bounds[zoom2][1][1]) {
        return null;
      }
       return "tiles/tile_" + zoom2 + "_" + x + "_" + coord.y + ".png";
                },
    tileSize: new google.maps.Size(524288, 524288)
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var prevZoomLevel;
    prevZoomLevel = zoomLevel;
    var z = map.getZoom();
    z < 9 ? zoomLevel = 1 : zoomLevel = 2;
    // console.log(z);
    if (prevZoomLevel !== zoomLevel || zoomLevel == 2) {
    switch (z)
    {
    case 9:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay9);
       overlay = overlay9
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 10:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay10);
       overlay = overlay10
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 11:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay11);
       overlay = overlay11
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 12:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay12);
       overlay = overlay12
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 13:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay13);
       overlay = overlay13
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 14:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay14);
       overlay = overlay14
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 15:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay15);
       overlay = overlay15
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 16:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay16);
       overlay = overlay16
       setOpacity(opacityCtrlKnob.valueX());
       break;
    case 17:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlay17);
       overlay = overlay17
       setOpacity(opacityCtrlKnob.valueX());
       break;
    default:
       map.overlayMapTypes.removeAt(0);
       map.overlayMapTypes.insertAt(0, overlayfull);
       overlay = overlayfull
       setOpacity(opacityCtrlKnob.valueX());
       break;
    }
    }
  });
  overlay = overlayfull
  createOpacityControl(map);
  map.overlayMapTypes.insertAt(0, overlayfull);
  var homeControlDiv = document.createElement('div');
  var homeControl = new HomeControl(homeControlDiv, map);
  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
}
function createOpacityControl(map) {
        var sliderImageUrl = "opacity-slider3d7.png";
        // Create main div to hold the control.
        var opacityDiv = document.createElement('DIV');
        opacityDiv.setAttribute("style", "margin:5px;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat;width:71px;height:21px;cursor:pointer;");
        // Create knob
        var opacityKnobDiv = document.createElement('DIV');
        opacityKnobDiv.setAttribute("style", "padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat -71px 0;width:14px;height:21px;");
        opacityDiv.appendChild(opacityKnobDiv);
        // no var => global variable
        opacityCtrlKnob = new ExtDraggableObject(opacityKnobDiv, {
                restrictY: true,
                container: opacityDiv
        });
        google.maps.event.addListener(opacityCtrlKnob, "dragend", function () {
                setOpacity(opacityCtrlKnob.valueX());
        });
        google.maps.event.addDomListener(opacityDiv, "click", function (e) {
                var left = findPosLeft(this);
                var x = e.pageX - left - 5; // - 5 as we're using a margin of 5px on the div
                opacityCtrlKnob.setValueX(x);
                setOpacity(x);
        });
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(opacityDiv);
        // Set initial value
        var initialValue = OPACITY_MAX_PIXELS*initialOpacity;
        opacityCtrlKnob.setValueX(initialValue);
        setOpacity(initialValue);
}
function setOpacity(pixelX) {
        // Range = 0 to OPACITY_MAX_PIXELS
        var value = pixelX / OPACITY_MAX_PIXELS ;
        if (value < 0) value = 0;
        if (value > 1) value = 1;
        overlay.setOpacity(value);
}
function findPosLeft(obj) {
        var curleft = 0;
        if (obj.offsetParent) {
                do {
                        curleft += obj.offsetLeft;
                } while (obj = obj.offsetParent);
                return curleft;
        }
        return undefined;
}
google.maps.event.addDomListener(window, 'load', initialize);

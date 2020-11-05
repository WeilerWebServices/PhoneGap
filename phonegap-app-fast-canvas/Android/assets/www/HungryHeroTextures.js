/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

TextureAtlas.textures = {
	bgWelcome:{
		imagePath:"bgWelcome.jpg", 
		SubTexture:[{name:"full", x:0, y:0, width:1024, height:512}]
	},
	bgLayer1:{
		imagePath:"bgLayer1.jpg", 
		SubTexture:[{name:"full", x:0, y:0, width:1024, height:512}]
	},
	spritesheet:{
		imagePath:"mySpritesheet.png", 
		SubTexture:[
			{name:"about_backButton", x:707, y:338, width:124, height:61},
			{name:"about_hsharmaLogo", x:1717, y:2, width:184, height:65},
			{name:"about_starlingLogo", x:1531, y:2, width:184, height:65},
			{name:"bgLayer2", x:2, y:403, width:1024, height:292, frameX:0, frameY:-26, frameWidth:1024, frameHeight:362},
			{name:"bgLayer3", x:2, y:697, width:1024, height:229, frameX:0, frameY:0, frameWidth:1024, frameHeight:279},
			{name:"bgLayer4", x:415, y:212, width:1024, height:124},
			{name:"fly_0001", x:766, y:928, width:153, height:77, frameX:-2, frameY:0, frameWidth:155, frameHeight:77},
			{name:"fly_0002", x:611, y:928, width:153, height:77, frameX:-2, frameY:0, frameWidth:155, frameHeight:77},
			{name:"fly_0003", x:1869, y:301, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0004", x:1651, y:219, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0005", x:1531, y:69, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0006", x:1376, y:2, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0007", x:1496, y:146, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0008", x:1883, y:226, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0009", x:1341, y:79, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0010", x:1221, y:2, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0011", x:1883, y:151, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0012", x:1686, y:144, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0013", x:1186, y:79, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0014", x:1066, y:2, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0015", x:1883, y:76, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0016", x:1686, y:69, width:153, height:73, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0017", x:1031, y:106, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0018", x:876, y:110, width:153, height:75, frameX:-2, frameY:-2, frameWidth:155, frameHeight:77},
			{name:"fly_0019", x:721, y:110, width:153, height:75, frameX:-2, frameY:0, frameWidth:155, frameHeight:77},
			{name:"fly_0020", x:921, y:928, width:153, height:75, frameX:-2, frameY:0, frameWidth:155, frameHeight:77},
			{name:"gameOver_aboutButton", x:442, y:928, width:167, height:79},
			{name:"gameOver_mainButton", x:2, y:928, width:166, height:90},
			{name:"gameOver_playAgainButton", x:899, y:2, width:165, height:102},
			{name:"item1", x:1496, y:79, width:29, height:30},
			{name:"item2", x:1496, y:111, width:22, height:33},
			{name:"item3", x:721, y:187, width:25, height:23},
			{name:"item4", x:1059, y:183, width:23, height:24},
			{name:"item5", x:1031, y:183, width:26, height:25},
			{name:"item6", x:988, y:338, width:56, height:55},
			{name:"item7", x:929, y:338, width:57, height:55},
			{name:"obstacle1", x:1274, y:156, width:139, height:53},
			{name:"obstacle1_crash", x:833, y:338, width:94, height:58},
			{name:"obstacle2", x:1555, y:221, width:79, height:71},
			{name:"obstacle2_crash", x:1806, y:237, width:61, height:75},
			{name:"obstacle3", x:1903, y:2, width:137, height:72},
			{name:"obstacle3_crash", x:338, y:928, width:102, height:80},
			{name:"obstacle4_0001", x:415, y:338, width:145, height:61},
			{name:"obstacle4_0002", x:562, y:338, width:143, height:61, frameX:-2, frameY:0, frameWidth:145, frameHeight:61},
			{name:"obstacle4_crash", x:1553, y:366, width:95, height:66},
			{name:"particleEat", x:611, y:1007, width:15, height:15},
			{name:"particleWindForce", x:170, y:1014, width:286, height:4, frameX:-4, frameY:0, frameWidth:294, frameHeight:4},
			{name:"pauseButton", x:1841, y:195, width:40, height:40},
			{name:"soundOff", x:1841, y:153, width:40, height:40},
			{name:"soundOn0000", x:1841, y:111, width:40, height:40},
			{name:"soundOn0001", x:1841, y:69, width:40, height:40},
			{name:"soundOn0002", x:1415, y:156, width:40, height:40},
			{name:"startButton", x:170, y:928, width:166, height:84},
			{name:"watchOut_0001", x:1441, y:221, width:112, height:72, frameX:0, frameY:-4, frameWidth:112, frameHeight:80},
			{name:"watchOut_0002", x:1441, y:295, width:110, height:70, frameX:0, frameY:-6, frameWidth:112, frameHeight:80},
			{name:"watchOut_0003", x:1667, y:294, width:106, height:70, frameX:0, frameY:-6, frameWidth:112, frameHeight:80},
			{name:"watchOut_0004", x:1555, y:294, width:110, height:70, frameX:0, frameY:-6, frameWidth:112, frameHeight:80},
			{name:"watchOut_0005", x:1441, y:221, width:112, height:72, frameX:0, frameY:-4, frameWidth:112, frameHeight:80},
			{name:"welcome_aboutButton", x:1186, y:156, width:86, height:54},
			{name:"welcome_hero", x:2, y:2, width:411, height:399},
			{name:"welcome_playButton", x:721, y:2, width:176, height:106},
			{name:"welcome_title", x:415, y:2, width:304, height:208},
			{name:"num_0", x:1849, y:989, width:19, height:23},
			{name:"num_1", x:1868, y:989, width:19, height:23},
			{name:"num_2", x:1887, y:989, width:19, height:23},
			{name:"num_3", x:1906, y:989, width:19, height:23},
			{name:"num_4", x:1925, y:989, width:19, height:23},
			{name:"num_5", x:1944, y:989, width:19, height:23},
			{name:"num_6", x:1963, y:989, width:19, height:23},
			{name:"num_7", x:1982, y:989, width:19, height:23},
			{name:"num_8", x:2001, y:989, width:19, height:23},
			{name:"num_9", x:2020, y:989, width:19, height:23}
		]
	}
};
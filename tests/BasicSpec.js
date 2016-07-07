describe("Simple Test:", function () { 
	
	it("a is in face 'Hello World!' and b to be not null", function () {
		var a = "Hello World!";
		expect(a).toBe("Hello World!");
	});

	it("b is true because it's true man", function () {
		var b = true;
		expect(b).toBe(true);
	});

	it("Array should sort in numerical order least to greatest", function(){
		var list = [3, 1, 4, 2, 5];
		arraySort(list);
		expect(list[0]).toBe(1);
	});

});
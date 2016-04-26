;
(function() {
    var canvas = document.getElementById('canvas'),
        numberInput = document.getElementById('number-input'),
        rangeInput = document.getElementById('range-input'),
        context = canvas.getContext('2d'),
        starImage = new Image(),
        firstTime = true,
        inputValue,
        originalImageData;

    function copyImageData(sourceImageData) {
        var copiedImageData = context.createImageData(sourceImageData.width, sourceImageData.height);
        copiedImageData.data.set(sourceImageData.data);
        return copiedImageData;
    }

    function changeImageColor() {
        if (firstTime) {
            originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
        }
        var imageData = copyImageData(originalImageData),
            data = imageData.data;
        if (parseInt(inputValue) !== 0) {
            for (var i = 0; i < data.length; i += 4) {
                if (inputValue > 0) {
                    data[i] = data[i] + Math.abs(inputValue) / 100 * (255 - data[i]);
                    data[i + 1] = data[i + 1] + Math.abs(inputValue) / 100 * (0 - data[i + 1]);
                    data[i + 2] = data[i + 2] + Math.abs(inputValue) / 100 * (0 - data[i + 2]);
                }
                if (inputValue < 0) {
                    data[i] = data[i] + Math.abs(inputValue) / 100 * (0 - data[i]);
                    data[i + 1] = data[i + 1] + Math.abs(inputValue) / 100 * (0 - data[i + 1]);
                    data[i + 2] = data[i + 2] + Math.abs(inputValue) / 100 * (255 - data[i + 2]);
                }
            }
        }
        context.putImageData(imageData, 0, 0);
        firstTime = false;
    }
    starImage.src = 'img.png';
    starImage.addEventListener('load', function() {
        context.drawImage(starImage, (canvas.width - starImage.width) / 2, (canvas.height - starImage.height) / 2);
    });

    function inputListener(inputType) {
        inputType.addEventListener('input', function() {
            checkAndSetInput(inputType);
        });
    }

    function checkAndSetInput(input) {
        switch (input) {
            case rangeInput:
                inputValue = numberInput.value = input.value;
                break;
            case numberInput:
                inputValue = rangeInput.value = input.value;
                break;
        }

        if (parseInt(inputValue) < -100) {
            inputValue = input.value = -100;
        }

        if (parseInt(inputValue) > 100) {
            inputValue = input.value = 100;
        }
        changeImageColor();
    }

    inputListener(numberInput);
    inputListener(rangeInput);

}());
